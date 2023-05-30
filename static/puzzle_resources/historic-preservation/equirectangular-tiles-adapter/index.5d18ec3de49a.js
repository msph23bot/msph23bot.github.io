(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('three'), require('@photo-sphere-viewer/core')) :
    typeof define === 'function' && define.amd ? define(['exports', 'three', '@photo-sphere-viewer/core'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.PhotoSphereViewer = global.PhotoSphereViewer || {}, global.PhotoSphereViewer.EquirectangularTilesAdapter = {}), global.THREE, global.PhotoSphereViewer));
})(this, (function (exports, THREE, PhotoSphereViewer) {

/*!
 * PhotoSphereViewer.EquirectangularTilesAdapter 5.1.2
 * @copyright 2023 Damien "Mistic" Sorel
 * @licence MIT (https://opensource.org/licenses/MIT)
 */
"use strict";
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };

  // @photo-sphere-viewer/core
  var require_core = () => PhotoSphereViewer;

  // three
  var require_three = () => THREE;

  // src/index.ts
  var src_exports = {};
  __export(src_exports, {
    EquirectangularTilesAdapter: () => EquirectangularTilesAdapter
  });

  // src/EquirectangularTilesAdapter.ts
  var import_core = require_core();
  var import_three2 = require_three();

  // ../shared/Queue.ts
  var Task = class {
    constructor(id, priority, fn) {
      this.id = id;
      this.priority = priority;
      this.fn = fn;
      this.status = 1 /* PENDING */;
    }
    start() {
      this.status = 2 /* RUNNING */;
      return this.fn(this).then(
        () => {
          this.status = 4 /* DONE */;
        },
        () => {
          this.status = 5 /* ERROR */;
        }
      );
    }
    cancel() {
      this.status = 3 /* CANCELLED */;
    }
    isCancelled() {
      return this.status === 3 /* CANCELLED */;
    }
  };
  var Queue = class {
    constructor(concurency = 4) {
      this.concurency = concurency;
      this.runningTasks = {};
      this.tasks = {};
    }
    enqueue(task) {
      this.tasks[task.id] = task;
    }
    clear() {
      Object.values(this.tasks).forEach((task) => task.cancel());
      this.tasks = {};
      this.runningTasks = {};
    }
    setPriority(taskId, priority) {
      const task = this.tasks[taskId];
      if (task) {
        task.priority = priority;
        if (task.status === 0 /* DISABLED */) {
          task.status = 1 /* PENDING */;
        }
      }
    }
    disableAllTasks() {
      Object.values(this.tasks).forEach((task) => {
        task.status = 0 /* DISABLED */;
      });
    }
    start() {
      if (Object.keys(this.runningTasks).length >= this.concurency) {
        return;
      }
      const nextTask = Object.values(this.tasks).filter((task) => task.status === 1 /* PENDING */).sort((a, b) => b.priority - a.priority).pop();
      if (nextTask) {
        this.runningTasks[nextTask.id] = true;
        nextTask.start().then(() => {
          if (!nextTask.isCancelled()) {
            delete this.tasks[nextTask.id];
            delete this.runningTasks[nextTask.id];
            this.start();
          }
        });
        this.start();
      }
    }
  };

  // ../shared/tiles-utils.ts
  var import_three = require_three();
  function buildErrorMaterial(width, height) {
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#333";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = `${canvas.width / 5}px serif`;
    ctx.fillStyle = "#a22";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("\u26A0", canvas.width / 2, canvas.height / 2);
    const texture = new import_three.CanvasTexture(canvas);
    return new import_three.MeshBasicMaterial({ map: texture });
  }

  // src/EquirectangularTilesAdapter.ts
  var NB_VERTICES_BY_FACE = 6;
  var NB_VERTICES_BY_SMALL_FACE = 3;
  var ATTR_UV = "uv";
  var ATTR_ORIGINAL_UV = "originaluv";
  var ATTR_POSITION = "position";
  function tileId(tile) {
    return `${tile.col}x${tile.row}`;
  }
  var getConfig = import_core.utils.getConfigParser(
    {
      resolution: 64,
      showErrorTile: true,
      baseBlur: true,
      blur: false
    },
    {
      resolution: (resolution) => {
        if (!resolution || !import_three2.MathUtils.isPowerOfTwo(resolution)) {
          throw new import_core.PSVError("EquirectangularTilesAdapter resolution must be power of two");
        }
        return resolution;
      }
    }
  );
  var frustum = new import_three2.Frustum();
  var projScreenMatrix = new import_three2.Matrix4();
  var vertexPosition = new import_three2.Vector3();
  var EquirectangularTilesAdapter = class extends import_core.AbstractAdapter {
    constructor(viewer, config) {
      super(viewer);
      this.state = {
        colSize: 0,
        rowSize: 0,
        facesByCol: 0,
        facesByRow: 0,
        tiles: {},
        geom: null,
        materials: [],
        errorMaterial: null
      };
      this.queue = new Queue();
      this.config = getConfig(config);
      this.viewer.config.useXmpData = false;
      this.SPHERE_SEGMENTS = this.config.resolution;
      this.SPHERE_HORIZONTAL_SEGMENTS = this.SPHERE_SEGMENTS / 2;
      this.NB_VERTICES = 2 * this.SPHERE_SEGMENTS * NB_VERTICES_BY_SMALL_FACE + (this.SPHERE_HORIZONTAL_SEGMENTS - 2) * this.SPHERE_SEGMENTS * NB_VERTICES_BY_FACE;
      this.NB_GROUPS = this.SPHERE_SEGMENTS * this.SPHERE_HORIZONTAL_SEGMENTS;
      if (this.viewer.config.requestHeaders) {
        import_core.utils.logWarn(
          'EquirectangularTilesAdapter fallbacks to file loader because "requestHeaders" where provided. Consider removing "requestHeaders" if you experience performances issues.'
        );
      } else {
        this.loader = new import_three2.ImageLoader();
        if (this.viewer.config.withCredentials) {
          this.loader.setWithCredentials(true);
        }
      }
      this.viewer.addEventListener(import_core.events.PositionUpdatedEvent.type, this);
      this.viewer.addEventListener(import_core.events.ZoomUpdatedEvent.type, this);
    }
    destroy() {
      this.viewer.addEventListener(import_core.events.PositionUpdatedEvent.type, this);
      this.viewer.addEventListener(import_core.events.ZoomUpdatedEvent.type, this);
      this.__cleanup();
      this.state.errorMaterial?.map?.dispose();
      this.state.errorMaterial?.dispose();
      delete this.state.geom;
      delete this.state.errorMaterial;
      super.destroy();
    }
    /**
     * @internal
     */
    handleEvent(e) {
      if (e instanceof import_core.events.PositionUpdatedEvent || e instanceof import_core.events.ZoomUpdatedEvent) {
        this.__refresh();
      }
    }
    supportsTransition(panorama) {
      return !!panorama.baseUrl;
    }
    supportsPreload(panorama) {
      return !!panorama.baseUrl;
    }
    loadTexture(panorama) {
      if (typeof panorama !== "object" || !panorama.width || !panorama.cols || !panorama.rows || !panorama.tileUrl) {
        return Promise.reject(new import_core.PSVError("Invalid panorama configuration, are you using the right adapter?"));
      }
      if (panorama.cols > this.SPHERE_SEGMENTS) {
        return Promise.reject(new import_core.PSVError(`Panorama cols must not be greater than ${this.SPHERE_SEGMENTS}.`));
      }
      if (panorama.rows > this.SPHERE_HORIZONTAL_SEGMENTS) {
        return Promise.reject(
          new import_core.PSVError(`Panorama rows must not be greater than ${this.SPHERE_HORIZONTAL_SEGMENTS}.`)
        );
      }
      if (!import_three2.MathUtils.isPowerOfTwo(panorama.cols) || !import_three2.MathUtils.isPowerOfTwo(panorama.rows)) {
        return Promise.reject(new import_core.PSVError("Panorama cols and rows must be powers of 2."));
      }
      const panoData = {
        fullWidth: panorama.width,
        fullHeight: panorama.width / 2,
        croppedWidth: panorama.width,
        croppedHeight: panorama.width / 2,
        croppedX: 0,
        croppedY: 0,
        poseHeading: 0,
        posePitch: 0,
        poseRoll: 0
      };
      if (panorama.baseUrl) {
        if (!this.adapter) {
          this.adapter = new import_core.EquirectangularAdapter(this.viewer, {
            blur: this.config.baseBlur
          });
        }
        return this.adapter.loadTexture(panorama.baseUrl, panorama.basePanoData).then((textureData) => ({
          panorama,
          texture: textureData.texture,
          panoData
        }));
      } else {
        return Promise.resolve({ panorama, panoData, texture: null });
      }
    }
    createMesh(scale = 1) {
      const geometry = new import_three2.SphereGeometry(
        import_core.CONSTANTS.SPHERE_RADIUS * scale,
        this.SPHERE_SEGMENTS,
        this.SPHERE_HORIZONTAL_SEGMENTS,
        -Math.PI / 2
      ).scale(-1, 1, 1).toNonIndexed();
      geometry.clearGroups();
      let i = 0;
      let k = 0;
      for (; i < this.SPHERE_SEGMENTS * NB_VERTICES_BY_SMALL_FACE; i += NB_VERTICES_BY_SMALL_FACE) {
        geometry.addGroup(i, NB_VERTICES_BY_SMALL_FACE, k++);
      }
      for (; i < this.NB_VERTICES - this.SPHERE_SEGMENTS * NB_VERTICES_BY_SMALL_FACE; i += NB_VERTICES_BY_FACE) {
        geometry.addGroup(i, NB_VERTICES_BY_FACE, k++);
      }
      for (; i < this.NB_VERTICES; i += NB_VERTICES_BY_SMALL_FACE) {
        geometry.addGroup(i, NB_VERTICES_BY_SMALL_FACE, k++);
      }
      geometry.setAttribute(ATTR_ORIGINAL_UV, geometry.getAttribute(ATTR_UV).clone());
      return new import_three2.Mesh(geometry, []);
    }
    /**
     * Applies the base texture and starts the loading of tiles
     */
    setTexture(mesh, textureData, transition) {
      const { panorama, texture } = textureData;
      if (transition) {
        this.__setTexture(mesh, texture);
        return;
      }
      this.__cleanup();
      this.__setTexture(mesh, texture);
      this.state.materials = mesh.material;
      this.state.geom = mesh.geometry;
      this.state.geom.setAttribute(ATTR_UV, this.state.geom.getAttribute(ATTR_ORIGINAL_UV).clone());
      this.state.colSize = panorama.width / panorama.cols;
      this.state.rowSize = panorama.width / 2 / panorama.rows;
      this.state.facesByCol = this.SPHERE_SEGMENTS / panorama.cols;
      this.state.facesByRow = this.SPHERE_HORIZONTAL_SEGMENTS / panorama.rows;
      setTimeout(() => this.__refresh(true));
    }
    __setTexture(mesh, texture) {
      let material;
      if (texture) {
        material = new import_three2.MeshBasicMaterial({ map: texture });
      } else {
        material = new import_three2.MeshBasicMaterial({ opacity: 0, transparent: true });
      }
      for (let i = 0; i < this.NB_GROUPS; i++) {
        mesh.material.push(material);
      }
    }
    setTextureOpacity(mesh, opacity) {
      mesh.material[0].opacity = opacity;
      mesh.material[0].transparent = opacity < 1;
    }
    /**
     * @throws {@link PSVError} always
     */
    setOverlay() {
      throw new import_core.PSVError("EquirectangularTilesAdapter does not support overlay");
    }
    disposeTexture(textureData) {
      textureData.texture?.dispose();
    }
    /**
     * Compute visible tiles and load them
     */
    // @ts-ignore unused paramater
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    __refresh(init = false) {
      if (!this.state.geom) {
        return;
      }
      const camera = this.viewer.renderer.camera;
      camera.updateMatrixWorld();
      projScreenMatrix.multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse);
      frustum.setFromProjectionMatrix(projScreenMatrix);
      const panorama = this.viewer.config.panorama;
      const verticesPosition = this.state.geom.getAttribute(ATTR_POSITION);
      const tilesToLoad = [];
      for (let col = 0; col < panorama.cols; col++) {
        for (let row = 0; row < panorama.rows; row++) {
          const verticesIndex = [];
          if (row === 0) {
            const v0 = this.state.facesByRow === 1 ? col * this.state.facesByCol * NB_VERTICES_BY_SMALL_FACE + 1 : this.SPHERE_SEGMENTS * NB_VERTICES_BY_SMALL_FACE + (this.state.facesByRow - 2) * this.SPHERE_SEGMENTS * NB_VERTICES_BY_FACE + col * this.state.facesByCol * NB_VERTICES_BY_FACE + 4;
            const v1 = this.state.facesByRow === 1 ? v0 + (this.state.facesByCol - 1) * NB_VERTICES_BY_SMALL_FACE + 1 : v0 + (this.state.facesByCol - 1) * NB_VERTICES_BY_FACE + 1;
            const v2 = 0;
            verticesIndex.push(v0, v1, v2);
            if (this.state.facesByCol >= this.SPHERE_SEGMENTS / 8) {
              const v4 = v0 + this.state.facesByCol / 2 * NB_VERTICES_BY_FACE;
              verticesIndex.push(v4);
            }
            if (this.state.facesByRow >= this.SPHERE_HORIZONTAL_SEGMENTS / 4) {
              const v6 = v0 - this.state.facesByRow / 2 * this.SPHERE_SEGMENTS * NB_VERTICES_BY_FACE;
              const v7 = v1 - this.state.facesByRow / 2 * this.SPHERE_SEGMENTS * NB_VERTICES_BY_FACE;
              verticesIndex.push(v6, v7);
            }
          } else if (row === panorama.rows - 1) {
            const v0 = this.state.facesByRow === 1 ? -this.SPHERE_SEGMENTS * NB_VERTICES_BY_SMALL_FACE + row * this.state.facesByRow * this.SPHERE_SEGMENTS * NB_VERTICES_BY_FACE + col * this.state.facesByCol * NB_VERTICES_BY_SMALL_FACE + 1 : -this.SPHERE_SEGMENTS * NB_VERTICES_BY_SMALL_FACE + row * this.state.facesByRow * this.SPHERE_SEGMENTS * NB_VERTICES_BY_FACE + col * this.state.facesByCol * NB_VERTICES_BY_FACE + 1;
            const v1 = this.state.facesByRow === 1 ? v0 + (this.state.facesByCol - 1) * NB_VERTICES_BY_SMALL_FACE - 1 : v0 + (this.state.facesByCol - 1) * NB_VERTICES_BY_FACE - 1;
            const v2 = this.NB_VERTICES - 1;
            verticesIndex.push(v0, v1, v2);
            if (this.state.facesByCol >= this.SPHERE_SEGMENTS / 8) {
              const v4 = v0 + this.state.facesByCol / 2 * NB_VERTICES_BY_FACE;
              verticesIndex.push(v4);
            }
            if (this.state.facesByRow >= this.SPHERE_HORIZONTAL_SEGMENTS / 4) {
              const v6 = v0 + this.state.facesByRow / 2 * this.SPHERE_SEGMENTS * NB_VERTICES_BY_FACE;
              const v7 = v1 + this.state.facesByRow / 2 * this.SPHERE_SEGMENTS * NB_VERTICES_BY_FACE;
              verticesIndex.push(v6, v7);
            }
          } else {
            const v0 = -this.SPHERE_SEGMENTS * NB_VERTICES_BY_SMALL_FACE + row * this.state.facesByRow * this.SPHERE_SEGMENTS * NB_VERTICES_BY_FACE + col * this.state.facesByCol * NB_VERTICES_BY_FACE + 1;
            const v1 = v0 + (this.state.facesByRow - 1) * this.SPHERE_SEGMENTS * NB_VERTICES_BY_FACE + 3;
            const v2 = v1 + (this.state.facesByCol - 1) * NB_VERTICES_BY_FACE + 1;
            const v3 = v0 + (this.state.facesByCol - 1) * NB_VERTICES_BY_FACE - 1;
            verticesIndex.push(v0, v1, v2, v3);
            if (this.state.facesByCol >= this.SPHERE_SEGMENTS / 8) {
              const v4 = v0 + this.state.facesByCol / 2 * NB_VERTICES_BY_FACE;
              const v5 = v1 + this.state.facesByCol / 2 * NB_VERTICES_BY_FACE;
              verticesIndex.push(v4, v5);
            }
            if (this.state.facesByRow >= this.SPHERE_HORIZONTAL_SEGMENTS / 4) {
              const v6 = v0 + this.state.facesByRow / 2 * this.SPHERE_SEGMENTS * NB_VERTICES_BY_FACE;
              const v7 = v3 + this.state.facesByRow / 2 * this.SPHERE_SEGMENTS * NB_VERTICES_BY_FACE;
              verticesIndex.push(v6, v7);
              if (this.state.facesByCol >= this.SPHERE_SEGMENTS / 8) {
                const v8 = v6 + this.state.facesByCol / 2 * NB_VERTICES_BY_FACE;
                verticesIndex.push(v8);
              }
            }
          }
          const vertexVisible = verticesIndex.some((vertexIdx) => {
            vertexPosition.set(
              verticesPosition.getX(vertexIdx),
              verticesPosition.getY(vertexIdx),
              verticesPosition.getZ(vertexIdx)
            );
            vertexPosition.applyEuler(this.viewer.renderer.sphereCorrection);
            return frustum.containsPoint(vertexPosition);
          });
          if (vertexVisible) {
            let angle = vertexPosition.angleTo(this.viewer.state.direction);
            if (row === 0 || row === panorama.rows - 1) {
              angle *= 2;
            }
            tilesToLoad.push({ col, row, angle });
          }
        }
      }
      this.__loadTiles(tilesToLoad);
    }
    /**
     * Loads tiles and change existing tiles priority
     */
    __loadTiles(tiles) {
      this.queue.disableAllTasks();
      tiles.forEach((tile) => {
        const id = tileId(tile);
        if (this.state.tiles[id]) {
          this.queue.setPriority(id, tile.angle);
        } else {
          this.state.tiles[id] = true;
          this.queue.enqueue(new Task(id, tile.angle, (task) => this.__loadTile(tile, task)));
        }
      });
      this.queue.start();
    }
    /**
     * Loads and draw a tile
     */
    __loadTile(tile, task) {
      const panorama = this.viewer.config.panorama;
      const url = panorama.tileUrl(tile.col, tile.row);
      if (!url) {
        return Promise.resolve();
      }
      return this.__loadImage(url).then((image) => {
        if (!task.isCancelled()) {
          const material = new import_three2.MeshBasicMaterial({ map: import_core.utils.createTexture(image) });
          this.__swapMaterial(tile.col, tile.row, material);
          this.viewer.needsUpdate();
        }
      }).catch(() => {
        if (!task.isCancelled() && this.config.showErrorTile) {
          if (!this.state.errorMaterial) {
            this.state.errorMaterial = buildErrorMaterial(this.state.colSize, this.state.rowSize);
          }
          this.__swapMaterial(tile.col, tile.row, this.state.errorMaterial);
          this.viewer.needsUpdate();
        }
      });
    }
    __loadImage(url) {
      if (this.loader) {
        return new Promise((resolve, reject) => {
          this.loader.load(url, resolve, void 0, reject);
        });
      } else {
        return this.viewer.textureLoader.loadImage(url);
      }
    }
    /**
     * Applies a new texture to the faces
     */
    __swapMaterial(col, row, material) {
      const uvs = this.state.geom.getAttribute(ATTR_UV);
      for (let c = 0; c < this.state.facesByCol; c++) {
        for (let r = 0; r < this.state.facesByRow; r++) {
          const faceCol = col * this.state.facesByCol + c;
          const faceRow = row * this.state.facesByRow + r;
          const isFirstRow = faceRow === 0;
          const isLastRow = faceRow === this.SPHERE_HORIZONTAL_SEGMENTS - 1;
          let firstVertex;
          if (isFirstRow) {
            firstVertex = faceCol * NB_VERTICES_BY_SMALL_FACE;
          } else if (isLastRow) {
            firstVertex = this.NB_VERTICES - this.SPHERE_SEGMENTS * NB_VERTICES_BY_SMALL_FACE + faceCol * NB_VERTICES_BY_SMALL_FACE;
          } else {
            firstVertex = this.SPHERE_SEGMENTS * NB_VERTICES_BY_SMALL_FACE + (faceRow - 1) * this.SPHERE_SEGMENTS * NB_VERTICES_BY_FACE + faceCol * NB_VERTICES_BY_FACE;
          }
          const matIndex = this.state.geom.groups.find((g) => g.start === firstVertex).materialIndex;
          this.state.materials[matIndex] = material;
          const top = 1 - r / this.state.facesByRow;
          const bottom = 1 - (r + 1) / this.state.facesByRow;
          const left = c / this.state.facesByCol;
          const right = (c + 1) / this.state.facesByCol;
          if (isFirstRow) {
            uvs.setXY(firstVertex, (left + right) / 2, top);
            uvs.setXY(firstVertex + 1, left, bottom);
            uvs.setXY(firstVertex + 2, right, bottom);
          } else if (isLastRow) {
            uvs.setXY(firstVertex, right, top);
            uvs.setXY(firstVertex + 1, left, top);
            uvs.setXY(firstVertex + 2, (left + right) / 2, bottom);
          } else {
            uvs.setXY(firstVertex, right, top);
            uvs.setXY(firstVertex + 1, left, top);
            uvs.setXY(firstVertex + 2, right, bottom);
            uvs.setXY(firstVertex + 3, left, top);
            uvs.setXY(firstVertex + 4, left, bottom);
            uvs.setXY(firstVertex + 5, right, bottom);
          }
        }
      }
      uvs.needsUpdate = true;
    }
    /**
     * Clears loading queue, dispose all materials
     */
    __cleanup() {
      this.queue.clear();
      this.state.tiles = {};
      this.state.materials.forEach((mat) => {
        mat?.map?.dispose();
        mat?.dispose();
      });
      this.state.materials.length = 0;
    }
  };
  EquirectangularTilesAdapter.id = "equirectangular-tiles";
  EquirectangularTilesAdapter.supportsDownload = false;
  EquirectangularTilesAdapter.supportsOverlay = false;
  __copyProps(__defProp(exports, "__esModule", { value: true }), src_exports);

}));//# sourceMappingURL=index.js.map
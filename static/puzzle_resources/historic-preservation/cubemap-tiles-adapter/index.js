(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('three'), require('@photo-sphere-viewer/core'), require('@photo-sphere-viewer/cubemap-adapter')) :
    typeof define === 'function' && define.amd ? define(['exports', 'three', '@photo-sphere-viewer/core', '@photo-sphere-viewer/cubemap-adapter'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.PhotoSphereViewer = global.PhotoSphereViewer || {}, global.PhotoSphereViewer.CubemapTilesAdapter = {}), global.THREE, global.PhotoSphereViewer, global.PhotoSphereViewer.CubemapAdapter));
})(this, (function (exports, THREE, PhotoSphereViewer, CubemapAdapter) {

/*!
 * PhotoSphereViewer.CubemapTilesAdapter 5.1.2
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

  // @photo-sphere-viewer/cubemap-adapter
  var require_cubemap_adapter = () => CubemapAdapter;

  // three
  var require_three = () => THREE;

  // src/index.ts
  var src_exports = {};
  __export(src_exports, {
    CubemapTilesAdapter: () => CubemapTilesAdapter
  });

  // src/CubemapTilesAdapter.ts
  var import_core = require_core();
  var import_cubemap_adapter = require_cubemap_adapter();
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

  // src/CubemapTilesAdapter.ts
  var CUBE_SEGMENTS = 16;
  var NB_VERTICES_BY_FACE = 6;
  var NB_VERTICES_BY_PLANE = NB_VERTICES_BY_FACE * CUBE_SEGMENTS * CUBE_SEGMENTS;
  var NB_VERTICES = 6 * NB_VERTICES_BY_PLANE;
  var NB_GROUPS_BY_FACE = CUBE_SEGMENTS * CUBE_SEGMENTS;
  var CUBE_HASHMAP = ["left", "right", "top", "bottom", "back", "front"];
  var ATTR_UV = "uv";
  var ATTR_ORIGINAL_UV = "originaluv";
  var ATTR_POSITION = "position";
  function tileId(tile) {
    return `${tile.face}:${tile.col}x${tile.row}`;
  }
  var getConfig = import_core.utils.getConfigParser({
    flipTopBottom: false,
    showErrorTile: true,
    baseBlur: true,
    blur: false
  });
  var frustum = new import_three2.Frustum();
  var projScreenMatrix = new import_three2.Matrix4();
  var vertexPosition = new import_three2.Vector3();
  var CubemapTilesAdapter = class extends import_core.AbstractAdapter {
    constructor(viewer, config) {
      super(viewer);
      this.state = {
        tileSize: 0,
        facesByTile: 0,
        tiles: {},
        geom: null,
        materials: [],
        errorMaterial: null
      };
      this.queue = new Queue();
      this.config = getConfig(config);
      if (this.viewer.config.requestHeaders) {
        import_core.utils.logWarn(
          'CubemapTilesAdapter fallbacks to file loader because "requestHeaders" where provided. Consider removing "requestHeaders" if you experience performances issues.'
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
      if (typeof panorama !== "object" || !panorama.faceSize || !panorama.nbTiles || !panorama.tileUrl) {
        return Promise.reject(new import_core.PSVError("Invalid panorama configuration, are you using the right adapter?"));
      }
      if (panorama.nbTiles > CUBE_SEGMENTS) {
        return Promise.reject(new import_core.PSVError(`Panorama nbTiles must not be greater than ${CUBE_SEGMENTS}.`));
      }
      if (!import_three2.MathUtils.isPowerOfTwo(panorama.nbTiles)) {
        return Promise.reject(new import_core.PSVError("Panorama nbTiles must be power of 2."));
      }
      if (panorama.baseUrl) {
        if (!this.adapter) {
          if (!import_cubemap_adapter.CubemapAdapter) {
            throw new import_core.PSVError("CubemapTilesAdapter requires CubemapAdapter");
          }
          this.adapter = new import_cubemap_adapter.CubemapAdapter(this.viewer, {
            blur: this.config.baseBlur
          });
        }
        return this.adapter.loadTexture(panorama.baseUrl).then((textureData) => ({
          panorama,
          texture: textureData.texture
        }));
      } else {
        return Promise.resolve({ panorama, texture: null });
      }
    }
    createMesh(scale = 1) {
      const cubeSize = import_core.CONSTANTS.SPHERE_RADIUS * 2 * scale;
      const geometry = new import_three2.BoxGeometry(cubeSize, cubeSize, cubeSize, CUBE_SEGMENTS, CUBE_SEGMENTS, CUBE_SEGMENTS).scale(1, 1, -1).toNonIndexed();
      geometry.clearGroups();
      for (let i = 0, k = 0; i < NB_VERTICES; i += NB_VERTICES_BY_FACE) {
        geometry.addGroup(i, NB_VERTICES_BY_FACE, k++);
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
      this.state.tileSize = panorama.faceSize / panorama.nbTiles;
      this.state.facesByTile = CUBE_SEGMENTS / panorama.nbTiles;
      setTimeout(() => this.__refresh(true));
    }
    __setTexture(mesh, texture) {
      for (let i = 0; i < 6; i++) {
        let material;
        if (texture) {
          if (this.config.flipTopBottom && (i === 2 || i === 3)) {
            texture[i].center = new import_three2.Vector2(0.5, 0.5);
            texture[i].rotation = Math.PI;
          }
          material = new import_three2.MeshBasicMaterial({ map: texture[i] });
        } else {
          material = new import_three2.MeshBasicMaterial({ opacity: 0, transparent: true });
        }
        for (let j = 0; j < NB_GROUPS_BY_FACE; j++) {
          mesh.material.push(material);
        }
      }
    }
    setTextureOpacity(mesh, opacity) {
      for (let i = 0; i < 6; i++) {
        mesh.material[i * NB_GROUPS_BY_FACE].opacity = opacity;
        mesh.material[i * NB_GROUPS_BY_FACE].transparent = opacity < 1;
      }
    }
    /**
     * @throws {@link PSVError} always
     */
    setOverlay() {
      throw new import_core.PSVError("EquirectangularTilesAdapter does not support overlay");
    }
    disposeTexture(textureData) {
      textureData.texture?.forEach((texture) => texture.dispose());
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
      for (let face = 0; face < 6; face++) {
        for (let col = 0; col < panorama.nbTiles; col++) {
          for (let row = 0; row < panorama.nbTiles; row++) {
            const verticesIndex = [];
            const v0 = face * NB_VERTICES_BY_PLANE + row * this.state.facesByTile * CUBE_SEGMENTS * NB_VERTICES_BY_FACE + col * this.state.facesByTile * NB_VERTICES_BY_FACE;
            const v1 = v0 + CUBE_SEGMENTS * NB_VERTICES_BY_FACE * (this.state.facesByTile - 1) + 1;
            const v2 = v1 + this.state.facesByTile * NB_VERTICES_BY_FACE - 3;
            const v3 = v0 + this.state.facesByTile * NB_VERTICES_BY_FACE - 1;
            verticesIndex.push(v0, v1, v2, v3);
            if (this.state.facesByTile >= CUBE_SEGMENTS / 2) {
              const v4 = v0 + this.state.facesByTile / 2 * NB_VERTICES_BY_FACE - 1;
              const v5 = v1 + this.state.facesByTile / 2 * NB_VERTICES_BY_FACE - 3;
              const v6 = v0 + CUBE_SEGMENTS * NB_VERTICES_BY_FACE * (this.state.facesByTile / 2 - 1) + 1;
              const v7 = v6 + this.state.facesByTile * NB_VERTICES_BY_FACE - 3;
              const v8 = v6 + this.state.facesByTile / 2 * NB_VERTICES_BY_FACE;
              verticesIndex.push(v4, v5, v6, v7, v8);
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
              const angle = vertexPosition.angleTo(this.viewer.state.direction);
              tilesToLoad.push({ face, col, row, angle });
            }
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
      let { col, row } = tile;
      if (this.config.flipTopBottom && (tile.face === 2 || tile.face === 3)) {
        col = panorama.nbTiles - col - 1;
        row = panorama.nbTiles - row - 1;
      }
      const url = panorama.tileUrl(CUBE_HASHMAP[tile.face], col, row);
      if (!url) {
        return Promise.resolve();
      }
      return this.__loadImage(url).then((image) => {
        if (!task.isCancelled()) {
          const material = new import_three2.MeshBasicMaterial({ map: import_core.utils.createTexture(image) });
          this.__swapMaterial(tile.face, tile.col, tile.row, material);
          this.viewer.needsUpdate();
        }
      }).catch(() => {
        if (!task.isCancelled() && this.config.showErrorTile) {
          if (!this.state.errorMaterial) {
            this.state.errorMaterial = buildErrorMaterial(this.state.tileSize, this.state.tileSize);
          }
          this.__swapMaterial(tile.face, tile.col, tile.row, this.state.errorMaterial);
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
    __swapMaterial(face, col, row, material) {
      const uvs = this.state.geom.getAttribute(ATTR_UV);
      for (let c = 0; c < this.state.facesByTile; c++) {
        for (let r = 0; r < this.state.facesByTile; r++) {
          const faceCol = col * this.state.facesByTile + c;
          const faceRow = row * this.state.facesByTile + r;
          const firstVertex = NB_VERTICES_BY_PLANE * face + 6 * (CUBE_SEGMENTS * faceRow + faceCol);
          const matIndex = this.state.geom.groups.find((g) => g.start === firstVertex).materialIndex;
          this.state.materials[matIndex] = material;
          let top = 1 - r / this.state.facesByTile;
          let bottom = 1 - (r + 1) / this.state.facesByTile;
          let left = c / this.state.facesByTile;
          let right = (c + 1) / this.state.facesByTile;
          if (this.config.flipTopBottom && (face === 2 || face === 3)) {
            top = 1 - top;
            bottom = 1 - bottom;
            left = 1 - left;
            right = 1 - right;
          }
          uvs.setXY(firstVertex, left, top);
          uvs.setXY(firstVertex + 1, left, bottom);
          uvs.setXY(firstVertex + 2, right, top);
          uvs.setXY(firstVertex + 3, left, bottom);
          uvs.setXY(firstVertex + 4, right, bottom);
          uvs.setXY(firstVertex + 5, right, top);
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
  CubemapTilesAdapter.id = "cubemap-tiles";
  CubemapTilesAdapter.supportsDownload = false;
  CubemapTilesAdapter.supportsOverlay = false;
  __copyProps(__defProp(exports, "__esModule", { value: true }), src_exports);

}));//# sourceMappingURL=index.js.map
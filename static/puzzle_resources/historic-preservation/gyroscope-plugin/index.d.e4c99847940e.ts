import { AbstractConfigurablePlugin, utils, Viewer, TypedEvent } from '@photo-sphere-viewer/core';

type GyroscopePluginConfig = {
    /**
     * allows to pan horizontally when the gyroscope is enabled (requires global `mousemove=true`)
     * @default true
     */
    touchmove?: boolean;
    /**
     * when true the view will ignore the current direction when enabling gyroscope control
     * @default false
     */
    absolutePosition?: boolean;
    /**
     * how the gyroscope data is used to rotate the panorama
     * @default 'smooth'
     */
    moveMode?: 'smooth' | 'fast';
};

/**
 * Adds gyroscope controls on mobile devices
 */
declare class GyroscopePlugin extends AbstractConfigurablePlugin<GyroscopePluginConfig, GyroscopePluginConfig, GyroscopePluginConfig, GyroscopePluginEvents> {
    static readonly id = "gyroscope";
    static readonly configParser: utils.ConfigParser<GyroscopePluginConfig, GyroscopePluginConfig>;
    private readonly state;
    private controls;
    constructor(viewer: Viewer, config: GyroscopePluginConfig);
    /**
     * Checks if the gyroscope is supported
     */
    isSupported(): Promise<boolean>;
    /**
     * Checks if the gyroscope is enabled
     */
    isEnabled(): boolean;
    /**
     * Enables the gyroscope navigation if available
     */
    start(moveMode?: "smooth" | "fast"): Promise<void>;
    /**
     * Disables the gyroscope navigation
     */
    stop(): void;
    /**
     * Enables or disables the gyroscope navigation
     */
    toggle(): void;
    /**
     * Handles gyro movements
     */
    private __onBeforeRender;
    /**
     * Intercepts moves and offsets the alpha angle
     */
    private __onBeforeRotate;
    /**
     * Detects if device orientation is supported
     */
    private __checkSupport;
    /**
     * Request permission to the motion API
     */
    private __requestPermission;
}

/**
 * Triggered when the gyroscope control is enabled/disabled
 */
declare class GyroscopeUpdatedEvent extends TypedEvent<GyroscopePlugin> {
    readonly gyroscopeEnabled: boolean;
    static readonly type = "gyroscope-updated";
    type: 'gyroscope-updated';
    constructor(gyroscopeEnabled: boolean);
}
type GyroscopePluginEvents = GyroscopeUpdatedEvent;

type events_GyroscopeUpdatedEvent = GyroscopeUpdatedEvent;
declare const events_GyroscopeUpdatedEvent: typeof GyroscopeUpdatedEvent;
type events_GyroscopePluginEvents = GyroscopePluginEvents;
declare namespace events {
  export {
    events_GyroscopeUpdatedEvent as GyroscopeUpdatedEvent,
    events_GyroscopePluginEvents as GyroscopePluginEvents,
  };
}

export { GyroscopePlugin, GyroscopePluginConfig, events };

import Base      from '../../core/Base.mjs';
import DomAccess from '../DomAccess.mjs';

/**
 * Helper class to include OpenStreetMaps into your neo.mjs app
 * https://docs.mapbox.com/mapbox-gl-js/overview/
 * @class Neo.main.lib.OpenStreetMaps
 * @extends Neo.core.Base
 * @singleton
 */
class OpenStreetMaps extends Base {
    static getConfig() {return {
        /**
         * @member {String} className='Neo.main.lib.OpenStreetMaps'
         * @private
         */
        className: 'Neo.main.lib.OpenStreetMaps',
        /**
         * @member {String} downloadPath='https://api.mapbox.com/mapbox-gl-js/'
         * @private
         */
        downloadPath: 'https://api.mapbox.com/mapbox-gl-js/',
        /**
         * @member {Boolean} scriptsLoaded_=true
         * @private
         */
        scriptsLoaded_: false,
        /**
         * @member {String} version='v1.8.1'
         * @private
         */
        version: 'v1.8.1',
    }}

    /**
     *
     * @param {Object} config
     */
    constructor(config) {
        super(config);

        if (Neo.config.useOpenStreetMaps) {
            this.insertOpenStreetMapsScripts();
        }
    }

    insertOpenStreetMapsScripts() {
        const me       = this,
              basePath = me.downloadPath + me.version + '/';

        Promise.all([
            DomAccess.loadScript(    basePath + 'mapbox-gl.js'),
            DomAccess.loadStylesheet(basePath + 'mapbox-gl.css')
        ]).then(() => {
            me.scriptsLoaded = true;
            console.log('insertOpenStreetMapsScripts');
        });
    }
}

Neo.applyClassConfig(OpenStreetMaps);

let instance = Neo.create(OpenStreetMaps);

Neo.applyToGlobalNs(instance);

export default instance;
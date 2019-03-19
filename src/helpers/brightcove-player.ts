// Require code for Brightcove player
export function getBrightcovePlayer(accountId, playerId = 'default', videoId, callback = () => {}) {
  CatchVideoPlayerLoad.getInstance().addPlayer(accountId, playerId, videoId, callback);
}

// Script tag for Brightcove player
export function scriptBrightcovePlayer(accountId, playerId = 'default', videoId, callback = () => {}) {
  let indexMin = '//players.brightcove.net/' + accountId + '/' + playerId + '_default/index.min.js';
  let s = document.createElement('script');
  s.src = indexMin;
  s.addEventListener('load', () => {
    console.log('Brightcove Player loaded...', videoId);
    callback();
  });
  document.head.appendChild(s);
}

interface ICatchVideoPlayerLoad {
  addPlayer(accountId, playerId, videoId, callback): void;
}

/**
 *
 *
 * @export
 * @class CatchVideoPlayerLoad
 * @implements {ICatchVideoPlayerLoad}
 * @description Callbacks for when an Brightcove video player is requested.
 */
export class CatchVideoPlayerLoad implements ICatchVideoPlayerLoad {
  private static instance: CatchVideoPlayerLoad;
  private _players: Array<any> = [];
  private _callback: Array<Function> = [];
  private _log: boolean;

  constructor() {
    if (CatchVideoPlayerLoad.instance) {
      throw new Error('Error - use CatchImageLoad.getInstance()');
    }
  }

  static getInstance(): CatchVideoPlayerLoad {
    CatchVideoPlayerLoad.instance = CatchVideoPlayerLoad.instance || new CatchVideoPlayerLoad();
    return CatchVideoPlayerLoad.instance;
  }

  private _requirePlayer(accountId, playerId, videoId, callback) {
    let indexMin = 'http://players.brightcove.net/' + accountId + '/' + playerId + '_default/index.min';
    let configId = 'requireId' + accountId + playerId + videoId;
    let config = { paths: { [configId]: indexMin }, waitSeconds: 30 };
    (window as any).require.config(config);
    (window as any).require([configId], () => {
      this._executeCallbacks();
      this._log && console.log('Require executed callbacks for', accountId, playerId, (window as any)['videojs']);
    });
  }

  private _scriptPlayer(accountId, playerId, videoId, callback) {
    let indexMin = 'http://players.brightcove.net/' + accountId + '/' + playerId + '_default/index.min.js';
    let s = document.createElement('script');
    s.src = indexMin;
    s.addEventListener('load', () => {
      this._executeCallbacks();
      this._log && console.log('Script Executed callback for:', accountId, playerId);
    });
    document.head.appendChild(s);
  }

  private _executeCallbacks() {
    this._callback.map((callback, index) => callback());
  }

  addPlayer(accountId, playerId, videoId, callback) {
    // Check to see if player within the same account was already requested
    let requested = false;
    this._players.forEach((player) => {
      if (player.accountId == accountId && player.playerId == playerId) {
        requested = true;
      }
    });

    // console.log('Brightcove Player requested...', accountId, playerId);
    // // If the player has NOT been requested...
    // // Add the players IDs to the list of players requested...
    // this._players.push({ accountId: accountId, playerId: playerId });
    // // Add the callback to the list of callbacks to be executed...
    // this._callback.push(callback);
    // // Request the player via RequireJS or Script tag...
    // (window as any).require ? this._requirePlayer(accountId, playerId, videoId, callback) : this._scriptPlayer(accountId, playerId, videoId, callback);

    if (!requested) {
      this._log && console.log('Brightcove Player requested...', accountId, playerId);
      // If the player has NOT been requested...
      // Add the players IDs to the list of players requested...
      this._players.push({ accountId: accountId, playerId: playerId });
      // Add the callback to the list of callbacks to be executed...
      this._callback.push(callback);
      // Request the player via RequireJS or Script tag...
      (window as any).require ? this._requirePlayer(accountId, playerId, videoId, callback) : this._scriptPlayer(accountId, playerId, videoId, callback);
    } else if ((window as any).videojs) {
      // If the player has been requested and recieved...
      this._callback.push(callback);
      callback();
      this._log && console.log('Brightcove Player has already been requested and videojs is ready!', (window as any).videojs.getAllPlayers());
    } else {
      // If the player has been requested but has not been recieved...
      this._callback.push(callback);
      this._log && console.log('Brightcove Player is being requested... Adding callback...', accountId, playerId);
    }
  }

  debug(debug: boolean) {
    this._log = debug;
  }
}

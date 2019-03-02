/**
 * loadImage
 * -----------
 * Loads and returns an <img>
 *
 * CatchImageLoad
 * --------------
 * A singleton that executes callbacks when an image is loaded successfully.
 * Usefull for updating values dependant on image size (ie. Scroll Magic).
 */

interface InterfaceImageLoader {
	src: string | undefined
	className?: string
	alt?: string
	href?: string
	title?: string
	target?: string
	style?: any
}

// loads and returns an image element
export function loadImage(props: InterfaceImageLoader): HTMLImageElement {
	let image = new Image()
	image.classList.add('is-loading')
	image.style.visibility = 'hidden'
	image.alt = props.alt ? props.alt : ''
	for (const key in props.style as CSSStyleDeclaration) {
		image.style[key] = props.style[key]
	}
	image.src = props.src
	image.addEventListener('load', onImageLoad)
	image.addEventListener('error', onImageError)
	return image
}

export function onImageLoad(event: Event) {
	CatchImageLoad.Instance.success(event)
}

export function onImageError(event: Event) {
	CatchImageLoad.Instance.failure(event)
}

// Callbacks for when an image is loaded successfully.
// Usefull for updating values dependant on image size (ie. Scroll Magic).
export namespace CatchImageLoad {
	interface ICatchImageLoad {
		success(event: Event): void
		failure(event: Event): void
		callBack(callback: Function): void
		debug(debug: boolean): void
	}
	class CatchImageLoad implements ICatchImageLoad {
		private _log: boolean = false
		private _callback: Array<Function> = []
		private usePrivate(): number {
			return this._callback.length
		}
		public callBack(callback: Function) {
			this._callback.push(callback)
		}
		public debug(debug: boolean) {
			this._log = debug
		}
		success(event: Event = undefined) {
			this._log &&
				console.log(
					'Image load success. Executing',
					this.usePrivate(),
					'callback(s)',
					this._callback,
					event ? (<HTMLImageElement>event.target).src : ''
				)
			if (this._callback) {
				this._callback.forEach((callBack) => {
					callBack()
				})
			}
		}
		failure(event: Event = undefined) {
			this._log &&
				console.log('Image load error. Executing', this.usePrivate(), 'callback(s)', this._callback, event ? (<HTMLImageElement>event.target).src : '')
			if (this._callback) {
				this._callback.forEach((callBack) => {
					callBack()
				})
			}
		}
	}
	export var Instance: ICatchImageLoad = new CatchImageLoad()
}

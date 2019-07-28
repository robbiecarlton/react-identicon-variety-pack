import { useEffect } from 'react'

export default function useRenderIcon (renderIcon, opts, canvasRef) {
	useEffect(() => {
		if (canvasRef.current) {
			renderIcon(opts, canvasRef.current)
		}
	})
}
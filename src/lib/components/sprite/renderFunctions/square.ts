import type RenderFunction from './RenderFunction'

export default function (color: string, size = 10): RenderFunction {
    return (context: CanvasRenderingContext2D, x: number, y: number, unit: number) => {
        context.save()
        context.fillStyle = color
        context.fillRect((x - size / 2) * unit, (y - size / 2) * unit, size * unit, size * unit)
        context.restore()
    }
}

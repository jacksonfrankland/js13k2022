import type RenderFunction from './RenderFunction'

export default function (color: string, diameter = 10): RenderFunction {
    return (context: CanvasRenderingContext2D, x: number, y: number, unit: number) => {
        context.save()
        context.beginPath()
        context.fillStyle = color
        context.arc(x * unit, y * unit, diameter / 2 * unit, 0, Math.PI * 2)
        context.fill()
        context.restore()
    }
}

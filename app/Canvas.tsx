'use client'
import {FC, useEffect, useRef, useState} from "react";

const Canvas: FC<{ width: number, height: number }> = ({width, height}) => {
  const [points, setPoints] = useState<{ x: number, y: number }[]>([])
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    render()
  }, [points.length])

  useEffect(() => {
    resizeCanvas()
  }, [width, height])

  useEffect(() => {
    const onClickHandler = (e: MouseEvent) => {
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvasRef.current?.getContext('2d')
        if (!ctx) return
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        setPoints(prev => [...prev, {
          x: x / canvas.width,
          y: y / canvas.height
        }])
      }
    }
    window.addEventListener('click', onClickHandler)
    return () => window.removeEventListener('click', onClickHandler)
  }, []);


  function render() {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvasRef.current.getContext('2d')
      if (!ctx) return
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.beginPath();
      ctx.lineWidth = 3;
      ctx.strokeStyle = "red";
      //  ctx.filter = 'blur(1px)'
      points.forEach((p, index) => {
        const x = p.x * canvas.width
        const y = p.y * canvas.height;
        ctx.moveTo(x + 10, y);
        ctx.arc(x, y, 12, 0, 2 * Math.PI);
        ctx.closePath();
      });
      ctx.stroke();
    }
  }

  function resizeCanvas() {
    const canvas = canvasRef.current;
    if (!canvas) return
    canvas.width = width
    canvas.height = height
    render()
  }

  return <canvas ref={canvasRef} style={{
    position: 'absolute',
    top: 0,
    left: 0
  }}/>
}

export default Canvas

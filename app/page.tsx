'use client'
import Canvas from "./Canvas";
import Image from "next/image";
import {useLayoutEffect, useRef, useState} from "react";
import {Avatar, AvatarFallback} from "../components/ui/avatar";
import {AvatarImage} from "@radix-ui/react-avatar";
import SprayWallImage from '../public/spray-wall.webp'

export default function Home() {
  const ref = useRef<HTMLImageElement>(null)
  const [width, setWidth] = useState<number>(0)
  const [height, setHeight] = useState<number>(0)

  useLayoutEffect(() => {
    const resizeCanvas = () => {
      setWidth(ref.current?.width ?? 0)
      setHeight(ref.current?.height ?? 0)
    }
    window.addEventListener('resize', resizeCanvas, false)
    resizeCanvas()
    return () => window.removeEventListener('resize', resizeCanvas, false)
  }, [])


  return (
    <div className={'flex lg:flex-row flex-col h-screen'}>
      <div className={'relative w-screen lg:w-1/2 overflow-y-scroll'}>
        <Image className={'rounded-md'} ref={ref}  priority src={SprayWallImage}
               alt={'spray-wall'} style={{opacity: '.8'}}/>
        {!!width && !!height && <Canvas width={width} height={height}/>}
      </div>
      <div className='flex items-center gap-2'>
        <Avatar className='text-sm'>
          <AvatarImage src="https://github.com/shadcn.png"/>
          <AvatarFallback>TN</AvatarFallback>
        </Avatar>
        <div className={'text-sm'}>
          <div className='text-sm'>Thomas Nilsen</div>
          <div className='text-sm text-gray-500'>29/07-2023</div>
        </div>
      </div>
    </div>
  )
}
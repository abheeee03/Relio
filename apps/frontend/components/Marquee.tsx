import React from 'react';
import { Card, CardContent } from './ui/card';
import { Avatar, AvatarFallback } from './ui/avatar';

function Marquee({items}: {items: {name: string, msg: string}[]}) {
  return (
    <>
      <div className='w-full text-5xl py-8  inline-flex flex-nowrap overflow-hidden mask-[linear-gradient(to_right,transparent_0,black_128px,black_calc(100%-200px),transparent_100%)]'>
        <ul className='flex items-center justify-center md:justify-start sm:[&_li]:mx-8 [&_li]:mx-4 [&_img]:max-w-none animate-infinite-scroll'>
          {
            items.map((t, idx)=>(
                <li key={idx}>
                    <Card>
                        <CardContent className='flex max-w-5xl w-full h-10 flex-col items-start justify-start'>
                          <div className="flex gap-1 items-center justify-center">
                            <Avatar className='h-6 w-6'>
                              <AvatarFallback className='text-sm'>{t.name[0]}</AvatarFallback>
                            </Avatar>
                            <p className='text-sm'>{t.name}</p>
                          </div>
                          <div className="w-full">
                            <p className='text-sm'>{t.msg}</p>
                          </div>
                        </CardContent>
                    </Card>
                </li>
            ))
          }
        </ul>
      </div>
    </>
  );
}

export default Marquee;

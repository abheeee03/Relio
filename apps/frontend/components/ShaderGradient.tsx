"use client"
import React from 'react'
import { ShaderGradientCanvas, ShaderGradient } from '@shadergradient/react'

function ShaderGradientComponent() {
    return (
        <ShaderGradientCanvas
            style={{
                width: '100%',
                height: '100%',
                position: "absolute",
                zIndex: 0
            }}
            lazyLoad={false}

            fov={undefined}
            pixelDensity={1}
            pointerEvents="none"
        >
            <ShaderGradient
                animate="on"
                type="waterPlane"
                wireframe={false}
                shader="defaults"
                uTime={0}
                uSpeed={0.3}
                uStrength={0.4}
                uDensity={0.8}
                uFrequency={5.5}
                uAmplitude={7}
                positionX={3.5}
                positionY={0.8}
                positionZ={0}
                rotationX={121}
                rotationY={158}
                rotationZ={60}
                color1="#ffffff"
                color2="#b9aefb"
                color3="#ffffff"
                reflection={0.5}

                // View (camera) props
                cAzimuthAngle={250}
                cPolarAngle={140}
                cDistance={0}
                cameraZoom={10.5}

                // Effect props
                lightType="3d"
                brightness={1.5}
                envPreset="city"
                grain="on"

                // Tool props
                toggleAxis={false}
                zoomOut={false}
                hoverState=""

                // Optional - if using transition features
                enableTransition={false}
            />
        </ShaderGradientCanvas>
    )
}

export default ShaderGradientComponent
"use client"

import React, {useEffect, useRef} from "react";
import * as PIXI from "pixi.js";

const loadScript = (src: string): Promise<void> => {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error(`Failed to load script ${src}`));
        document.head.appendChild(script);
    });
};
const Live2DModelComponent: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const initLive2D = async () => {
            if (!canvasRef.current) return;

            try {
                await loadScript('/live2dcubismcore.min.js'); // 動的にスクリプトを読み込み

                // 名前空間が存在するかを確認
                if (window.Live2DCubismCore) {
                    // モジュールを動的にインポート
                    const {Live2DModel, Live2DFactory} = await import('pixi-live2d-display/cubism4');

                    const app = new PIXI.Application({
                        view: canvasRef.current,
                        // width: window.innerWidth,
                        // height: window.innerHeight,
                        autoStart: true,
                        backgroundAlpha: 0,
                        backgroundColor: 0x0000ff,
                        resizeTo: window
                    });

                    const model = await Live2DModel.from('/KITU_RE23/KITU_RE23.model3.json'); // Adjust path as needed
                    // transforms
                    model.rotation = Math.PI;
                    model.skew.x = Math.PI;
                    model.anchor.set(0.5, 0.5);
                    model.position.set(window.innerWidth / 2, window.innerHeight / 0.85);
                    app.stage.addChild(model);

                    // モデルの位置やスケールを設定
                    model.position.set(app.view.width / 2, app.view.height / 2);
                    model.scale.set(0.1, 0.1);

                    app.ticker.add(() => {
                        model.update(app.ticker.deltaTime);
                    });
                } else {
                    console.error('Cubism 4 runtime is not loaded');
                }
            } catch (error) {
                console.error('Failed to load Live2D model:', error);
            }
        };

        initLive2D();
    })

    return (
        <canvas ref={canvasRef}></canvas>
    );
}

export default Live2DModelComponent;
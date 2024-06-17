// src/Canvas.js
import React, { useRef, useState, useEffect } from 'react';

const Canvas = ({ activeTool }) => {
    const canvasRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [startPoint, setStartPoint] = useState({ x: 0, y: 0 });
    const [shapes, setShapes] = useState([]);
    const [currentShape, setCurrentShape] = useState(null);
    const [selectedShape, setSelectedShape] = useState(null);
    const [textPosition, setTextPosition] = useState({ x: 0, y: 0 });
    const [textValue, setTextValue] = useState("");

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        shapes.forEach(shape => {
            drawShape(ctx, shape);
        });

        if (currentShape) {
            drawShape(ctx, currentShape);
        }
    }, [shapes, currentShape]);

    useEffect(() => {
        const canvas = canvasRef.current;
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
        return () => window.removeEventListener('resize', resizeCanvas);
    }, []);

    const handleMouseDown = (e) => {
        const rect = canvasRef.current.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        if (activeTool === 'rectangle') {
            setStartPoint({ x: mouseX, y: mouseY });
            setIsDrawing(true);
        } else if (activeTool === 'circle') {
            setStartPoint({ x: mouseX, y: mouseY });
            setIsDrawing(true);
        } else if (activeTool === 'diamond') {
            setStartPoint({ x: mouseX, y: mouseY });
            setIsDrawing(true);
        } else if (activeTool === 'line') {
            setStartPoint({ x: mouseX, y: mouseY });
            setIsDrawing(true);
        } else if (activeTool === 'arrow') {
            setStartPoint({ x: mouseX, y: mouseY });
            setIsDrawing(true);
        } else if (activeTool === 'text') {
            setTextPosition({ x: mouseX, y: mouseY });
            const text = prompt("Enter text:");
            if (text !== null) {
                setTextValue(text);
            }
        }
    };


    const handleMouseMove = (e) => {
        const rect = canvasRef.current.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        if (isDrawing) {
            if (activeTool === 'rectangle') {
                setCurrentShape({
                    type: 'rectangle',
                    x: Math.min(mouseX, startPoint.x),
                    y: Math.min(mouseY, startPoint.y),
                    width: Math.abs(mouseX - startPoint.x),
                    height: Math.abs(mouseY - startPoint.y),
                });
            } else if (activeTool === 'circle') {
                setCurrentShape({
                    type: 'circle',
                    x: startPoint.x,
                    y: startPoint.y,
                    radius: Math.sqrt(Math.pow(mouseX - startPoint.x, 2) + Math.pow(mouseY - startPoint.y, 2)),
                });
            } else if (activeTool === 'diamond') {
                setCurrentShape({
                    type: 'diamond',
                    x: startPoint.x,
                    y: startPoint.y,
                    size: Math.max(Math.abs(mouseX - startPoint.x), Math.abs(mouseY - startPoint.y)),
                });
            } else if (activeTool === 'line') {
                setCurrentShape({
                    type: 'line',
                    x1: startPoint.x,
                    y1: startPoint.y,
                    x2: mouseX,
                    y2: mouseY,
                });
            } else if (activeTool === 'arrow') {
                setCurrentShape({
                    type: 'arrow',
                    x1: startPoint.x,
                    y1: startPoint.y,
                    x2: mouseX,
                    y2: mouseY,
                });
            }
        }
    };

    const handleMouseUp = () => {
        if (isDrawing) {
            setIsDrawing(false);
            if (currentShape) {
                setShapes([...shapes, currentShape]);
                setCurrentShape(null);
            }
            if (activeTool === 'text' && textValue !== "") {
                setShapes([...shapes, { type: 'text', x: textPosition.x, y: textPosition.y, value: textValue }]);
                setTextValue("");
            }
        }
    };

    const handleClear = () => {
        setShapes([]);
    };

    const drawShape = (ctx, shape) => {
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 2;
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';

        switch (shape.type) {
            case 'rectangle':
                ctx.beginPath();
                ctx.rect(shape.x, shape.y, shape.width, shape.height);
                ctx.closePath();
                ctx.stroke();
                break;
            case 'circle':
                ctx.beginPath();
                ctx.arc(shape.x, shape.y, shape.radius, 0, 2 * Math.PI);
                ctx.closePath();
                ctx.stroke();
                break;
            case 'diamond':
                const halfSize = shape.size / 2;
                ctx.beginPath();
                ctx.moveTo(shape.x, shape.y - halfSize);
                ctx.lineTo(shape.x + halfSize, shape.y);
                ctx.lineTo(shape.x, shape.y + halfSize);
                ctx.lineTo(shape.x - halfSize, shape.y);
                ctx.closePath();
                ctx.stroke();
                break;
            case 'line':
                ctx.beginPath();
                ctx.moveTo(shape.x1, shape.y1);
                ctx.lineTo(shape.x2, shape.y2);
                ctx.stroke();
                break;
            case 'arrow':
                const angle = Math.atan2(shape.y2 - shape.y1, shape.x2 - shape.x1);
                const arrowLength = 10;
                ctx.beginPath();
                ctx.moveTo(shape.x1, shape.y1);
                ctx.lineTo(shape.x2, shape.y2);
                ctx.lineTo(shape.x2 - arrowLength * Math.cos(angle - Math.PI / 6), shape.y2 - arrowLength * Math.sin(angle - Math.PI / 6));
                ctx.moveTo(shape.x2, shape.y2);
                ctx.lineTo(shape.x2 - arrowLength * Math.cos(angle + Math.PI / 6), shape.y2 - arrowLength * Math.sin(angle + Math.PI / 6));
                ctx.stroke();
                break;
            case 'text':
                ctx.font = '16px Arial';
                ctx.fillStyle = 'white';
                ctx.fillText(shape.value, shape.x, shape.y);
                break;
            default:
                break;
        }
    };

    return (
        <div>
            <canvas
                ref={canvasRef}
                style={{ display: 'block' }}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
            />
            <button
                onClick={handleClear}
                className="fixed bottom-4 right-4 p-2 bg-red-500 text-white rounded-lg"
            >
                Clear
            </button>
        </div>
    );
};

export default Canvas;

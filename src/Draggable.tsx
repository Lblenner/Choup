import React, { useState, useCallback, useMemo, useEffect, CSSProperties } from 'react';

const POSITION = { x: 0, y: 0 };

const Draggable = ({ children, id, onDrag, onDragEnd, onDragbegin }) => {
    const [state, setState] = useState({
        isDragging: false,
        origin: POSITION,
        translation: POSITION
    });

    const handleMouseDown = useCallback(({ clientX, clientY }) => {
        setState(state => ({
            ...state,
            isDragging: true,
            origin: { x: clientX, y: clientY }
        }));

        onDragbegin()
    }, []);

    const handleMouseMove = useCallback(({ clientX, clientY }) => {

        const translation = { x: clientX - state.origin.x, y: clientY - state.origin.y };

        setState(state => ({
            ...state,
            translation
        }));

        onDrag({ translation, id });

    }, [state.origin, onDrag, id]);

    const handleMouseUp = useCallback(() => {
        setState(state => ({
            ...state,
            isDragging: false,
        }));

        onDragEnd();

    }, [onDragEnd]);

    useEffect(() => {
        if (state.isDragging) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
        } else {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);

            setState(state => ({ ...state, translation: { x: 0, y: 0 } }));
        }
    }, [state.isDragging, handleMouseMove, handleMouseUp]);

    const styles: CSSProperties = useMemo(() => ({
        cursor: state.isDragging ? 'grabbing' : 'grab',
        transform: state.isDragging ? `translate(${state.translation.x}px, ${state.translation.y}px)` : `translate(0px, 0px)`,
        transition: state.isDragging ? 'none' : 'transform 500ms',
        zIndex: state.isDragging ? 2 : 1,
        position: 'absolute'
    }), [state.isDragging, state.translation]);

    return (
        <div style={styles} onMouseDown={handleMouseDown}>
            {children}
        </div>
    );
};

export default Draggable;
const onMouseHover = (event, front, back) => {
    const clientX = event.clientX;
    const clientY = event.clientY;

    const finalX = clientX / 100;
    const finalY = clientY / 45;

    front.style.backgroundPositionX = `-${finalX}px`;
    front.style.backgroundPositionY = `${finalY}px`;
    back.style.backgroundPositionX = `${finalX}px`;
}

export {
    onMouseHover
}

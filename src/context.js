const canvas = document.getElementById("canvas");
let ctx = canvas.getContext('2d');
ctx.height = canvas.height;
ctx.width = canvas.width;

ctx.clear = (clr) => {
    ctx.fillStyle = clr;
    ctx.fillRect(0,0, canvas.width, canvas.height);
};

export default ctx;

export default function updatePicture(node) {
  const drawingNode = node.getLayer() || node.getStage();
  drawingNode?.batchDraw();
}

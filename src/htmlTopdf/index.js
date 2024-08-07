import html2canvas from "./utils/html2canvas.js";
import jsPDF from "./utils/jspdf.js";

exports.htmlToPdf = (downloadDom, downloadName) => {
  const options = {
    // dpi属性的值为192，表示图像的分辨率
    dpi: 192,
    // scale属性的值为2，表示图像的缩放比例。 
    scale: 2,
    // backgroundColor属性的值为"#F1F6FE"，表示图像的背景颜色。
    backgroundColor: "#F1F6FE"
  };
  // 将元素转换为canvas对象
  html2canvas(downloadDom, options).then((canvas) => {
    // 获取Canvas(上面元素id 'layout-wrapper')对象的宽度
    var contentWidth = canvas.width;
    // 获取Canvas(上面元素id 'layout-wrapper')对象的高度
    var contentHeight = canvas.height;
    // 创建jsPDF对象
    // 导入jsPDF库，用于创建PDF文件
    // jsPDF = jspdf.jsPDF;
    // 创建一个新的PDF对象，参数包括页面格式（'1'表示A4纸张）、单位（'pt'）和页面尺寸（[contentWidth, contentHeight]）
    const pdf = new jsPDF('1', 'pt', [contentWidth, contentHeight]);
    // 将Canvas对象转换为JPEG格式的数据，并将其存储在pageData变量中。1.0表示图片质量
    const pageData = canvas.toDataURL('image/jpeg', 1.0);
    // 将JPEG格式的图片添加到PDF文件中，图片的左上角坐标为(0, 0)，宽度为contentWidth，高度为contentHeight
    pdf.addImage(pageData, 'JPEG', 0, 0, contentWidth, contentHeight);
    pdf.save(downloadName + ".pdf");
  });
}

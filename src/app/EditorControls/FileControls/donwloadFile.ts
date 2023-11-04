export const downloadFile = (binaryString: string, filename: string) => {
    const base64Data = btoa(binaryString);

    const element = document.createElement('a');
    element.setAttribute('href', 'data:application/octet-stream;base64,' + base64Data);
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
};

import { downloadFile } from "./donwloadFile";

export const downloadBinary = (numbers: number[], filename: string) => {
    const bytes = new Uint8Array(numbers);
    let binaryString = '';
    bytes.forEach((byte) => {
        binaryString += String.fromCharCode(byte);
    });
    downloadFile(binaryString, filename);
};

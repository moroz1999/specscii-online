import sanitize from 'sanitize-filename';

type GenerateProps = {
    author: string,
    imageName: string,
    extension: string
};

export const generateFileName = ({
    author,
    imageName,
    extension
}: GenerateProps) => {

    let name = author ? author + ' - ' : '';
    name = imageName ? name + imageName : name;

    return sanitize(`${name}.${extension}`);
};

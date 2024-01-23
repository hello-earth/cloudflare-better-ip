const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

//https://zip.baipiao.eu.org/
function readAllFilenames(directoryPath) {
    // 读取目录内容
    fs.readdir(directoryPath, (err, files) => {
        if (err) {
            console.error('读取目录出错: ', err);
            return;
        }

        // 遍历每个文件名并输出
        files.forEach((file) => {
            const filename = path.basename(file,path.extname(file))
            const fileNameWithFullPath = directoryPath+"/"+file;
            const country = filename.split("-")[0]
            const port = filename.split("-")[2]
            const cmd = `~/script/CloudflareST/CloudflareST -f ${fileNameWithFullPath} -o ${filename}.csv -tp ${port}`;
            console.log(cmd)

            try {
                const output = execSync(cmd);
                console.log(output.toString()); // 命令的输出
            } catch (error) {
                console.error(`执行命令时发生错误: ${error}`);
            }
        });
    });
}

// 调用函数读取文件名
readAllFilenames('~/Downloads/txt');
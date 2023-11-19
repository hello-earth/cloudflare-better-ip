const fs = require('fs');

function readAllFilenames(directoryPath) {
    // 读取目录内容
    fs.readdir(directoryPath, (err, files) => {
        if (err) {
            console.error('读取目录出错: ', err);
            return;
        }

        // 遍历每个文件名并输出
        files.forEach((file) => {
            // 读取文件内容
            fs.readFile(directoryPath+"/"+file, 'utf8', (err, data) => {
                if (err) {
                    console.error('读取文件出错: ', err);
                    return;
                }

                // 将文件内容按行分割为数组
                const lines = data.split('\n');

                // 创建用于聚合国家结果的对象
                const countries = {};

                // 遍历每一行数据
                lines.forEach((line) => {
                    if(line == ''){
                        return;
                    }
                    // 提取国家代码
                    const countryCode = line.split('|')[2].trim();

                    // 将数据写入对应的国家文件
                    if (countries[countryCode]) {
                        countries[countryCode].push(line);
                    } else {
                        countries[countryCode] = [line];
                    }
                });

                // 将结果写入不同的文件
                for (const countryCode in countries) {
                    const fileName = countryCode + '.txt';
                    const fileContent = countries[countryCode].join('\n');

                    if(!fs.existsSync("result")) {
                        fs.mkdirSync("result")
                    }
                    if(!fs.existsSync("result/"+directoryPath)) {
                        fs.mkdirSync("result/"+directoryPath)
                    }
                    fs.writeFile("result/"+directoryPath+"/"+fileName, fileContent, 'utf8', (err) => {
                        if (err) {
                            console.error('写入文件出错: ', err);
                            return;
                        }

                        console.log(fileName + ' 文件已保存');
                    });
                }
            });
        });
    });
}

// 调用函数读取文件名
readAllFilenames('cloudflare');
readAllFilenames('cloudfront');

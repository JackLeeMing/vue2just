set -e
pwd
echo $1


mv -f * /apps/cmd-swift/

cd /apps/cmd-swift/

npm install --registry=https://registry.npmmirror.com
npm run build

cd ./docker/
docker build -t $IMAGE_TAG .
docker push $IMAGE_TAG
docker rmi -f $IMAGE_TAG
cd ..

curl 'https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=6b0ddfd7-fab0-4352-ac9d-0cfdb7b18b59' \
    -H 'Content-Type: application/json' \
    -d "{
  \"msgtype\": \"markdown\",
  \"markdown\": {
    \"content\": \" <font color='warning'>【${CONTAINER_NAME}】【${CI_COMMIT_REF_NAME}分支】</font >的镜像已经构建成功了，请相关同事注意。\n >完整TAG: <font color='comment'>${IMAGE_TAG} </font>\n >版本TAG: <font color='info'>${TAG} </font>\",
    \"mentioned_list\": [\"@all\"]
  }
}"


FROM mysql:5.7

# 设置环境变量
ENV MYSQL_ROOT_PASSWORD=root
ENV MYSQL_DATABASE=yuexuan
ENV MYSQL_USER=admin
ENV MYSQL_PASSWORD=123456

# 复制初始化脚本到容器中
# COPY init.sql /docker-entrypoint-initdb.d/

# 暴露端口
EXPOSE 3306
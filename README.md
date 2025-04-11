# 缓存 @nestjs/cache-manager 与 ioredis

# 数据库表结构

- 用户user

  - 昵称
  - 密码
  - 头像
  - 性别
  - 手机号
  - 邮箱
  - 是否注销 isDeleted 物理标记
  - 创建时间
  - 更新时间

- 店铺shop

  - 店铺名称 name
  - 店铺描述 description
  - 店铺图片 logo
  - 店铺联系人姓名 contact_name
  - 店铺联系人电话 contact_phone
  - 店铺地址 shop_address
  - 店铺经度 shop_lng
  - 店铺纬度 shop_lat

- 商品good

  - 商品名称name
  - 商品价格price
  - 商品原价origin_price
  - 商品销量sales
  - 商品标签tags // ['新品', '热卖']
  - 商品状态status // 上架 下架 售罄
  - 商品服务说明services // [{ title: 不约可退, content: 未预约可全额退款 }]
  - 商品轮播图carousel_pics // [{ src, url?:}]
  - 商品套餐内容 package_content
  - 商品图片 pictures
  - 商品使用规则 good_rule
  - 商品有效期开始 validity_start
  - 商品有效期结束 validity_end
  - 商品特殊时段 special_time
  - 商品库存stock
  - 所属店铺 shop_id
  - 所属分类 categoryId

- 商品分类 category

  - 类别名称 name
  - 类别图片 icon
  - 父级分类 parentId

- 商品分组 group

  - 分组名称name
  - 分组图片icon

- 商品与分组关系 good_group

  - 商品id goodId
  - 分组id groupId

- 订单order

  - 订单编号 order_no
  - 订单总金额 total_amount
  - 订单金额 amount
  - 订单数量 count
  - 订单优惠金额 discount_amount
  - 订单实付金额 pay_amount
  - 订单状态 status // 待付款 待发货 待收货 待预约 退换/售后
  - 所属店铺 shop_id
  - 所属商品 good_id
  - 下单人 user_id
  - 创建时间（下单时间）createdAt
  - 支付时间（付款时间）payAt
  - 发货时间（发货时间）sendAt
  - 收货时间（收货时间）receiveAt
  - 预约时间（预约时间）appointAt
  - 退换/售后时间（退换/售后时间）refundAt

- 我的收藏collection

  - 用户id user_id
  - 商品id good_id
  - 创建时间 createdAt
  - 收藏状态 status // 1 已收藏 0 取消收藏

- 优惠券coupon

  - 优惠券名称 name
  - 优惠券描述 description
  - 优惠券状态 status // 未使用 新到 快过期 已过期 已使用
  - 优惠金额 amount
  - 优惠条件 condition // 1满减 2折扣 3满折
  - 优惠券类型 type // 1满减 2折扣 3满折

- 地址address
  - 收货人姓名name
  - 收货人电话phone
  - 收货地址经度lng
  - 收货地址纬度lat
  - 收货地址address_name
  - 详细地址address_detail
  - 地址所属人 user_id
  - 默认地址 default // 1 是 0 否
  - 创建时间createdAt
  - 更新时间updatedAt

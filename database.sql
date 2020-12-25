CREATE DATABASE IF NOT EXISTS `sale_achievement` CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `sale_achievement`;
-- 推销员表
CREATE TABLE IF NOT EXISTS `staff`(
  `id` INT(9) NOT NULL PRIMARY KEY COMMENT "工号",
  `name` VARCHAR(64) NOT NULL COMMENT "姓名",
  `nickname` VARCHAR(64) DEFAULT NULL COMMENT "微信昵称",
  `avatar_url` VARCHAR(255) DEFAULT NULL COMMENT "微信头像",
  `openid` varchar(255) DEFAULT NULL COMMENT "微信openID",
  `password` varchar(255) NOT NULL COMMENT "密码",
  `is_quit` TINYINT(4) NOT NULL DEFAULT 0 COMMENT "是否离职"
) ENGINE = InnoDB DEFAULT CHARSET = utf8 COLLATE = utf8_bin COMMENT = '推销员表';

-- 课程表
CREATE TABLE IF NOT EXISTS `course`(
  `id` INT(9) NOT NULL AUTO_INCREMENT PRIMARY KEY COMMENT "课程ID",
  `name` VARCHAR(64) NOT NULL COMMENT "课程名",
  `teacher` VARCHAR(64) NOT NULL COMMENT "授课教师",
  `price` INT(11) NOT NULL COMMENT "课程价格",
  `is_stop` TINYINT(4) DEFAULT 0 COMMENT "是否停用"
) ENGINE = InnoDB DEFAULT CHARSET = utf8 COLLATE = utf8_bin COMMENT = '课程表';

-- 客户表
CREATE TABLE IF NOT EXISTS `customer`(
  `id` INT(9) NOT NULL AUTO_INCREMENT PRIMARY KEY COMMENT "客户ID",
  `name` VARCHAR(64) NOT NULL COMMENT "客户姓名",
  `phone` VARCHAR(32) NOT NULL COMMENT "客户电话",
  `wechat` VARCHAR(32) DEFAULT NULL COMMENT "客户微信号",
  `school` VARCHAR(32) DEFAULT NULL COMMENT "所在学校",
  `age` INT(2) DEFAULT NULL COMMENT "孩子年龄",
  `grade` VARCHAR(32) DEFAULT NULL COMMENT "孩子年级",
  `is_paid` TINYINT(4) DEFAULT 0 COMMENT "是否支付",
  `money` INT(11) DEFAULT 0 COMMENT "支付金额",
  `staff_id` INT(9) NOT NULL COMMENT "推销员工号",
  `course_id` INT(9) NOT NULL COMMENT "课程ID",
  `join_time` VARCHAR(32) NOT NULL COMMENT "添加时间",
  CONSTRAINT `FK_customer_staff` FOREIGN KEY (`staff_id`) REFERENCES `staff` (`id`),
  CONSTRAINT `FK_customer_course` FOREIGN KEY (`course_id`) REFERENCES `course` (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8 COLLATE = utf8_bin COMMENT = '客户表';
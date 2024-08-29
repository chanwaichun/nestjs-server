/*
Navicat MySQL Data Transfer

Source Server         : localhost_3301
Source Server Version : 50720
Source Host           : localhost:3306
Source Database       : report_database

Target Server Type    : MYSQL
Target Server Version : 50720
File Encoding         : 65001

Date: 2024-08-29 11:52:51
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for car
-- ----------------------------
DROP TABLE IF EXISTS `car`;
CREATE TABLE `car` (
  `userId` varchar(20) DEFAULT NULL,
  `userName` varchar(255) DEFAULT NULL,
  `car` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of car
-- ----------------------------
INSERT INTO `car` VALUES ('122968205462421504', '张伟', 'sdsda');
INSERT INTO `car` VALUES ('122968775661600768', '张伟', 'hom');
INSERT INTO `car` VALUES ('122976201311928320', '2222是啥', 'toyota');
INSERT INTO `car` VALUES ('652051848483741696', '张伟', 'toshiba');
INSERT INTO `car` VALUES ('652052057007759360', '张伟', 'tasl;a');
INSERT INTO `car` VALUES ('652052071209672704', '张伟', 'haier');
INSERT INTO `car` VALUES ('652052071209672704', '张伟', 'h22222222');

-- ----------------------------
-- Table structure for label
-- ----------------------------
DROP TABLE IF EXISTS `label`;
CREATE TABLE `label` (
  `userId` varchar(20) DEFAULT NULL,
  `value` varchar(255) DEFAULT NULL,
  `id` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of label
-- ----------------------------
INSERT INTO `label` VALUES ('123356151902781440', '撒大苏打撒旦', '124685554352013312');
INSERT INTO `label` VALUES ('123356151902781440', '撒大苏打撒旦2', '124685554352013313');
INSERT INTO `label` VALUES ('123356151902781440', '撒大苏打撒旦11', '124685554352013314');

-- ----------------------------
-- Table structure for question_practice_detail
-- ----------------------------
DROP TABLE IF EXISTS `question_practice_detail`;
CREATE TABLE `question_practice_detail` (
  `id` int(11) NOT NULL,
  `device_id` int(11) NOT NULL,
  `question_id` int(11) NOT NULL,
  `result` varchar(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of question_practice_detail
-- ----------------------------
INSERT INTO `question_practice_detail` VALUES ('1', '2138', '111', 'wrong');
INSERT INTO `question_practice_detail` VALUES ('2', '3214', '112', 'wrong');
INSERT INTO `question_practice_detail` VALUES ('3', '3214', '113', 'wrong');
INSERT INTO `question_practice_detail` VALUES ('4', '6543', '111', 'right');
INSERT INTO `question_practice_detail` VALUES ('5', '2315', '115', 'right');
INSERT INTO `question_practice_detail` VALUES ('6', '2315', '116', 'right');
INSERT INTO `question_practice_detail` VALUES ('7', '2315', '117', 'wrong');
INSERT INTO `question_practice_detail` VALUES ('8', '5432', '118', 'wrong');
INSERT INTO `question_practice_detail` VALUES ('9', '5432', '112', 'wrong');
INSERT INTO `question_practice_detail` VALUES ('10', '2131', '114', 'right');
INSERT INTO `question_practice_detail` VALUES ('11', '5432', '113', 'wrong');

-- ----------------------------
-- Table structure for subject
-- ----------------------------
DROP TABLE IF EXISTS `subject`;
CREATE TABLE `subject` (
  `subject_id` varchar(20) NOT NULL,
  `subject_type` varchar(20) NOT NULL,
  `subject_name` varchar(20) NOT NULL,
  `creator_name` varchar(20) DEFAULT NULL,
  `creator_id` varchar(20) DEFAULT NULL,
  `create_time` datetime NOT NULL,
  `update_time` datetime NOT NULL,
  PRIMARY KEY (`subject_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of subject
-- ----------------------------

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `user_id` varchar(20) NOT NULL,
  `user_name` varchar(255) DEFAULT NULL,
  `phone` varchar(255) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role_id` varchar(20) DEFAULT NULL,
  `user_img` varchar(255) DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  `update_time` datetime DEFAULT NULL COMMENT '\r\n',
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('z8cFt3P73M', '13532299454', '13532299454', '111111', '0', null, null, null);

-- ----------------------------
-- Table structure for user_profile
-- ----------------------------
DROP TABLE IF EXISTS `user_profile`;
CREATE TABLE `user_profile` (
  `id` int(11) NOT NULL,
  `device_id` int(11) NOT NULL,
  `gender` varchar(14) NOT NULL,
  `age` int(11) DEFAULT NULL,
  `university` varchar(32) NOT NULL,
  `gpa` float DEFAULT NULL,
  `active_days_within_30` int(11) DEFAULT NULL,
  `question_cnt` int(11) DEFAULT NULL,
  `answer_cnt` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user_profile
-- ----------------------------
INSERT INTO `user_profile` VALUES ('1', '2138', 'male', '21', '北京大学', '3.4', '7', '2', '12');
INSERT INTO `user_profile` VALUES ('2', '3214', 'male', null, '复旦大学', '4', '15', '5', '25');
INSERT INTO `user_profile` VALUES ('3', '6543', 'female', '20', '北京大学', '3.2', '12', '3', '30');
INSERT INTO `user_profile` VALUES ('4', '2315', 'female', '23', '浙江大学', '3.6', '5', '1', '2');
INSERT INTO `user_profile` VALUES ('5', '5432', 'male', '25', '山东大学', '3.8', '20', '15', '70');
INSERT INTO `user_profile` VALUES ('6', '2131', 'male', '28', '山东大学', '3.3', '15', '7', '13');
INSERT INTO `user_profile` VALUES ('7', '4321', 'male', '28', '复旦大学', '3.6', '9', '6', '52');

import { Injectable } from '@angular/core';
import { Events } from '@ionic/angular';
import { PopoversService } from '../popovers/popovers.service';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

// import 'src/assets/plugins/sdk/json2.js';
// import 'src/assets/plugins/md5/spark-md5.js';
import * as webim from 'src/assets/plugins/sdk/webim.js';

// declare let webim: any;

export interface loginInfo {
  sdkAppID; //用户所属应用id,必填
  identifier; //当前用户ID,必须是否字符串类型，必填
  // identifier: "user_b", //当前用户ID,必须是否字符串类型，必填
  accountType; //用户所属应用帐号类型，必填
  userSig;
  //当前用户身份凭证，必须是字符串类型，必填
  identifierNick; //当前用户昵称，不用填写，登录接口会返回用户的昵称，如果没有设置，则返回用户的id
  headurl; //当前用户默认头像，选填，如果设置过头像，则可以通过拉取个人资料接口来得到头像信息
}
export interface RecentSessMap {
  SessionType?: any; //会话类型
  SessionId?: any; //会话对象id，好友id或者群id
  SessionNick?: any; //会话昵称，好友昵称或群名称
  SessionImage?: any; //会话头像，好友头像或者群头像
  C2cAccount?: any; //发送者id，群聊时，才有用
  C2cNick?: any; //发送者昵称，群聊时，才有用
  UnreadMsgCount?: any; //未读消息数,私聊时需要通过webim.syncMsgs(initUnreadMsgCount)获取,参考后面的demo，群聊时不需要。
  MsgSeq?: any; //消息seq
  MsgRandom?: any; //消息随机数
  MsgTimeStamp?: any; //消息时间戳
  MsgGroupReadedSeq?: any;
  MsgShow?: any;//消息内容,文本消息为原内容，表情消息为[表情],其他类型消息以此类推
}
export interface InfoMap {
  name?: any;
  image?: any;
  selType?: any;
  selToID?: any;
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  sumTotal: number;//会话未读总数

  webim = webim;

  constructor(
    private event: Events,
    private popoversServ: PopoversService,
    private ib: InAppBrowser,
  ) {
    console.log('Hello CustomeServicesProvider Provider');
    //表情标识字符和索引映射关系对象，用户可以自定义
    webim.EmotionDataIndexs = {
      "[):]": 0,
      "[:D]": 1,
      "[;)]": 2,
      "[:-o]": 3,
      "[:p]": 4,
      "[(H)]": 5,
      "[:@]": 6,
      "[:s]": 7,
      "[:$]": 8,
      "[:(]": 9,
      "[:'(]": 10,
      "[:|]": 11,
      "[(a)]": 12,
      "[8o|]": 13,
      "[8-|]": 14,
      "[+o(]": 15,
      "[<o)]": 16,
      "[|-)]": 17,
      "[*-)]": 18,
      "[:-#]": 19,
      "[:-*]": 20,
      "[^o)]": 21,
      "[8-)]": 22,
      "[(|)]": 23,
      "[(u)]": 24,
      "[(S)]": 25,
      "[(*)]": 26,
      "[(#)]": 27,
      "[(R)]": 28,
      "[({)]": 29,
      "[(})]": 30,
      "[(k)]": 31,
      "[(F)]": 32,
      "[(W)]": 33,
      "[(D)]": 34
    };

    //表情对象，用户可以自定义
    webim.Emotions = {
      "0": ["[):]", './assets/icons/emotions/ee_1.png'],
      "1": ["[:D]", './assets/icons/emotions/ee_2.png'],
      "2": ["[;)]", './assets/icons/emotions/ee_3.png'],
      "3": ["[:-o]", './assets/icons/emotions/ee_4.png'],
      "4": ["[:p]", './assets/icons/emotions/ee_5.png'],
      "5": ["[(H)]", './assets/icons/emotions/ee_6.png'],
      "6": ["[:@]", './assets/icons/emotions/ee_7.png'],
      "7": ["[:s]", './assets/icons/emotions/ee_8.png'],
      "8": ["[:$]", './assets/icons/emotions/ee_9.png'],
      "9": ["[:(]", './assets/icons/emotions/ee_10.png'],
      "10": ["[:'(]", './assets/icons/emotions/ee_11.png'],
      "11": ["[:|]", './assets/icons/emotions/ee_18.png'],
      "12": ["[(a)]", './assets/icons/emotions/ee_13.png'],
      "13": ["[8o|]", './assets/icons/emotions/ee_14.png'],
      "14": ["[8-|]", './assets/icons/emotions/ee_15.png'],
      "15": ["[+o(]", './assets/icons/emotions/ee_16.png'],
      "16": ["[<o)]", './assets/icons/emotions/ee_12.png'],
      "17": ["[|-)]", './assets/icons/emotions/ee_17.png'],
      "18": ["[*-)]", './assets/icons/emotions/ee_19.png'],
      "19": ["[:-#]", './assets/icons/emotions/ee_20.png'],
      "20": ["[:-*]", './assets/icons/emotions/ee_22.png'],
      "21": ["[^o)]", './assets/icons/emotions/ee_21.png'],
      "22": ["[8-)]", './assets/icons/emotions/ee_23.png'],
      "23": ["[(|)]", './assets/icons/emotions/ee_24.png'],
      "24": ["[(u)]", './assets/icons/emotions/ee_25.png'],
      "25": ["[(S)]", './assets/icons/emotions/ee_26.png'],
      "26": ["[(*)]", './assets/icons/emotions/ee_27.png'],
      "27": ["[(#)]", './assets/icons/emotions/ee_28.png'],
      "28": ["[(R)]", './assets/icons/emotions/ee_29.png'],
      "29": ["[({)]", './assets/icons/emotions/ee_30.png'],
      "30": ["[(})]", './assets/icons/emotions/ee_31.png'],
      "31": ["[(k)]", './assets/icons/emotions/ee_32.png'],
      "32": ["[(F)]", './assets/icons/emotions/ee_33.png'],
      "33": ["[(W)]", './assets/icons/emotions/ee_34.png'],
      "34": ["[(D)]", './assets/icons/emotions/ee_35.png']
    };
  }
  //帐号模式，0-表示独立模式，1-表示托管模式
  accountMode = 0;

  //官方 demo appid,需要开发者自己修改（托管模式）
  // sdkAppID = 1400104136;
  sdkAppID = 1400158766;
  accountType = 2;

  //当前用户身份
  loginInfo: loginInfo = {
    sdkAppID: this.sdkAppID, //用户所属应用id,必填
    identifier: null, //当前用户ID,必须是否字符串类型，必填
    accountType: this.accountType, //用户所属应用帐号类型，必填
    userSig: null,
    //当前用户身份凭证，必须是字符串类型，必填
    identifierNick: null, //当前用户昵称，不用填写，登录接口会返回用户的昵称，如果没有设置，则返回用户的id
    headurl: 'https://img.jingku.cn/data/avatar/APP_20180926140732108306.jpg' //当前用户默认头像，选填，如果设置过头像，则可以通过拉取个人资料接口来得到头像信息
  };

  AdminAcount = 'adminjingku';
  selType = webim.SESSION_TYPE.C2C; //当前聊天类型
  selToID = null; //当前选中聊天id（当聊天类型为私聊时，该值为好友帐号，否则为群号）
  selSess = null; //当前聊天会话对象
  recentSessMap: { [x: string]: RecentSessMap; } = {}; //保存最近会话列表
  reqRecentSessCount = 20; //每次请求的最近会话条数，业务可以自定义

  isPeerRead = 1; //是否需要支持APP端已读回执的功能,默认为0。是：1，否：0。

  //默认好友头像
  friendHeadUrl = 'https://img.jingku.cn/data/avatar/APP_20180926140732108306.jpg'; //仅demo使用，用于没有设置过头像的好友
  //默认群头像
  groupHeadUrl = 'https://img.jingku.cn/data/avatar/APP_20180926140732108306.jpg'; //仅demo使用，用于没有设置过群头像的情况


  //存放c2c或者群信息（c2c用户：c2c用户id，昵称，头像；群：群id，群名称，群头像）
  infoMap: InfoMap = {}; //初始化时，可以先拉取我的好友和我的群组信息


  maxNameLen = 12; //我的好友或群组列表中名称显示最大长度，仅demo用得到
  reqMsgCount = 15; //每次请求的历史消息(c2c获取群)条数，仅demo用得到

  pageSize = 15; //表格的每页条数，bootstrap table 分页时用到
  totalCount = 200; //每次接口请求的条数，bootstrap table 分页时用到

  emotionFlag = false; //是否打开过表情选择框

  curPlayAudio = null; //当前正在播放的audio对象

  getPrePageC2CHistroyMsgInfoMap = {}; //保留下一次拉取好友历史消息的信息
  getPrePageGroupHistroyMsgInfoMap = {}; //保留下一次拉取群历史消息的信息

  defaultSelGroupId = null; //登录默认选中的群id，选填，仅demo用得到

  //监听（多终端同步）群系统消息方法，方法都定义在receive_group_system_msg.js文件中
  //注意每个数字代表的含义，比如，
  //1表示监听申请加群消息，2表示监听申请加群被同意消息，3表示监听申请加群被拒绝消息
  onGroupSystemNotifys = {
    "1": this.onApplyJoinGroupRequestNotify.bind(this), //申请加群请求（只有管理员会收到）
    "2": this.onApplyJoinGroupAcceptNotify.bind(this), //申请加群被同意（只有申请人能够收到）
    "3": this.onApplyJoinGroupRefuseNotify.bind(this), //申请加群被拒绝（只有申请人能够收到）
    "4": this.onKickedGroupNotify.bind(this), //被管理员踢出群(只有被踢者接收到)
    "5": this.onDestoryGroupNotify.bind(this), //群被解散(全员接收)
    "6": this.onCreateGroupNotify.bind(this), //创建群(创建者接收)
    "7": this.onInvitedJoinGroupNotify.bind(this), //邀请加群(被邀请者接收)
    "8": this.onQuitGroupNotify.bind(this), //主动退群(主动退出者接收)
    "9": this.onSetedGroupAdminNotify.bind(this), //设置管理员(被设置者接收)
    "10": this.onCanceledGroupAdminNotify.bind(this), //取消管理员(被取消者接收)
    "11": this.onRevokeGroupNotify.bind(this), //群已被回收(全员接收)
    "15": this.onReadedSyncGroupNotify.bind(this), //群消息已读同步通知
    "255": this.onCustomGroupNotify.bind(this), //用户自定义通知(默认全员接收)
    "12": this.onInvitedJoinGroupNotifyRequest.bind(this) //邀请加群(被邀请者接收,接收者需要同意)
  };
  //监听好友系统通知函数对象，方法都定义在receive_friend_system_msg.js文件中
  onFriendSystemNotifys = {
    "1": this.onFriendAddNotify.bind(this), //好友表增加
    "2": this.onFriendDeleteNotify.bind(this), //好友表删除
    "3": this.onPendencyAddNotify.bind(this), //未决增加
    "4": this.onPendencyDeleteNotify.bind(this), //未决删除
    "5": this.onBlackListAddNotify.bind(this), //黑名单增加
    "6": this.onBlackListDeleteNotify.bind(this) //黑名单删除
  };
  onC2cEventNotifys = {
    "92": this.onMsgReadedNotify.bind(this), //消息已读通知,
    "96": this.onMultipleDeviceKickedOut.bind(this)
  };

  //监听资料系统通知函数对象，方法都定义在receive_profile_system_msg.js文件中
  onProfileSystemNotifys = {
    "1": this.onProfileModifyNotify.bind(this) //资料修改
  };

  onApplyJoinGroupRequestNotify(res) {
    console.warn(res)
  }
  onApplyJoinGroupAcceptNotify(res) {
    console.warn(res)
  }
  onApplyJoinGroupRefuseNotify(res) {
    console.warn(res)
  }
  onKickedGroupNotify(res) {
    console.warn(res)
  }
  onDestoryGroupNotify(res) {
    console.warn(res)
  }
  onCreateGroupNotify(res) {
    console.warn(res)
  }
  onInvitedJoinGroupNotify(res) {
    console.warn(res)
  }
  onQuitGroupNotify(res) {
    console.warn(res)
  }
  onSetedGroupAdminNotify(res) {
    console.warn(res)
  }
  onCanceledGroupAdminNotify(res) {
    console.warn(res)
  }
  onRevokeGroupNotify(res) {
    console.warn(res)
  }
  onReadedSyncGroupNotify(res) {
    console.warn(res)
  }
  onCustomGroupNotify(res) {
    console.warn(res)
  }
  onInvitedJoinGroupNotifyRequest(res) {
    console.warn(res)
  }
  onFriendAddNotify(res) {
    console.warn(res)
  }
  onFriendDeleteNotify(res) {
    console.warn(res)
  }
  onPendencyAddNotify(res) {
    console.warn(res)
  }
  onPendencyDeleteNotify(res) {
    console.warn(res)
  }
  onBlackListAddNotify(res) {
    console.warn(res)
  }
  onBlackListDeleteNotify(res) {
    console.warn(res)
  }
  onMsgReadedNotify(res) {
    console.warn(res)
  }
  onMultipleDeviceKickedOut(res) {
    webim.Log.error("多终端登录，被T了");
  }
  onProfileModifyNotify(res) {
    console.warn(res)
  }
  //监听连接状态回调变化事件
  onConnNotify(resp) {
    let info;
    switch (resp.ErrorCode) {
      case webim.CONNECTION_STATUS.ON:
        webim.Log.warn('建立连接成功: ' + resp.ErrorInfo);
        break;
      case webim.CONNECTION_STATUS.OFF:
        info = '连接已断开，无法收到新消息，请检查下你的网络是否正常: ' + resp.ErrorInfo;
        // this.popoversServ.presentToast(info);
        webim.Log.warn(info);
        break;
      case webim.CONNECTION_STATUS.RECONNECT:
        info = '连接状态恢复正常: ' + resp.ErrorInfo;
        // this.popoversServ.presentToast(info);
        webim.Log.warn(info);
        break;
      default:
        webim.Log.error('未知连接状态: =' + resp.ErrorInfo);
        break;
    }
  };

  //IE9(含)以下浏览器用到的jsonp回调函数
  jsonpCallback(rspData) {
    webim.setJsonpLastRspData(rspData);
  }
  //监听新消息事件
  msgList = [];
  //newMsgList 为新消息数组，结构为[Msg]
  onMsgNotify = (newMsgList) => {
    console.log(newMsgList)
    for (let j in newMsgList) { //遍历新消息
      let newMsg = newMsgList[j];
      if (newMsg.getSession().id() == this.selToID) { //为当前聊天对象的消息
        //在聊天窗体中新增一条消息
        // console.warn(newMsg);
        this.addMsg(newMsg, false);
      }

      this.msgList.push(newMsg.elems[0].content.text);
    }
    //消息已读上报，以及设置会话自动已读标记
    // webim.setAutoRead(this.selSess, true, true);

    this.initRecentContactList(() => { }, () => { })
  }
  onBigGroupMsgNotify(res) {
    console.warn(res)
  }
  onGroupInfoChangeNotify(res) {
    console.warn(res)
  }
  onKickedEventCall() {
    // this.popoversServ.openAlertBox('被其他登录实例踢下线',()=>{})
    console.log('被其他登录实例踢下线')
  }
  onAppliedDownloadUrl(res) {
    console.warn(res)
  }
  //监听事件
  listeners = {
    "onConnNotify": this.onConnNotify.bind(this) //监听连接状态回调变化事件,必填
    ,
    "jsonpCallback": this.jsonpCallback.bind(this) //IE9(含)以下浏览器用到的jsonp回调函数，
    ,
    "onMsgNotify": this.onMsgNotify.bind(this) //监听新消息(私聊，普通群(非直播聊天室)消息，全员推送消息)事件，必填
    ,
    "onBigGroupMsgNotify": this.onBigGroupMsgNotify.bind(this) //监听新消息(直播聊天室)事件，直播场景下必填
    ,
    "onGroupSystemNotifys": this.onGroupSystemNotifys //监听（多终端同步）群系统消息事件，如果不需要监听，可不填
    ,
    "onGroupInfoChangeNotify": this.onGroupInfoChangeNotify.bind(this) //监听群资料变化事件，选填
    ,
    "onFriendSystemNotifys": this.onFriendSystemNotifys //监听好友系统通知事件，选填
    ,
    "onProfileSystemNotifys": this.onProfileSystemNotifys //监听资料系统（自己或好友）通知事件，选填
    ,
    "onKickedEventCall": this.onKickedEventCall.bind(this) //被其他登录实例踢下线
    ,
    "onC2cEventNotifys": this.onC2cEventNotifys //监听C2C系统消息通道
    ,
    "onAppliedDownloadUrl": this.onAppliedDownloadUrl.bind(this) //申请文件/音频下载地址的回调
    ,
    "onLongPullingNotify": (data) => {
      console.debug('onLongPullingNotify', data)
    }
  };
  //初始化时，其他对象，选填
  options = {
    'isAccessFormalEnv': true, //是否访问正式环境，默认访问正式，选填
    'isLogOn': false //是否开启控制台打印日志,默认开启，选填
  }


  webimLogin(loginInfo) {

    this.loginInfo.identifier = loginInfo && loginInfo.identifier;
    this.loginInfo.userSig = loginInfo && loginInfo.userSig;
    this.loginInfo.identifierNick = loginInfo && loginInfo.identifierNick;
    this.loginInfo.headurl = loginInfo && loginInfo.headurl;

    webim.login(
      this.loginInfo,
      this.listeners,
      this.options,
      (resp) => {
        this.loginInfo.identifierNick = resp.identifierNick; //设置当前用户昵称
        this.loginInfo.headurl = resp.headurl; //设置当前用户头像


        //读取我的好友列表
        this.initInfoMapByMyFriends(
          //读取我的群组列表
          this.initInfoMapByMyGroups(

            this.initRecentContactList(() => {
              this.event.publish('im:login', resp);
            }, () => {

            })
          )
        );
        // initDemoApp();

        // webim.getPendencyGroup({
        //         StartTime: 0,
        //         Limit: 10
        //     },
        //     () =>{

        //     })
        webim.syncGroupMsgs({}, (data) => {
          console.debug(data);
        }, (data) => {
          console.debug(data);
          console.log()
        });
      },
      (err) => {
        this.popoversServ.presentToast(err.ErrorInfo);
      });
  }
  webimLogout() {
    webim.logout();
    this.sumTotal = 0;
  }

  //将我的好友资料（昵称和头像）保存在infoMap
  initInfoMapByMyFriends = (cbOK) => {

    let options = {
      'From_Account': this.loginInfo.identifier,
      'TimeStamp': 0,
      'StartIndex': 0,
      'GetCount': this.totalCount,
      'LastStandardSequence': 0,
      "TagList": [
        "Tag_Profile_IM_Nick",
        "Tag_Profile_IM_Image"
      ]
    };

    webim.getAllFriend(
      options,
      (resp) => {
        if (resp.FriendNum > 0) {

          let friends = resp.InfoItem;
          if (!friends || friends.length == 0) {
            if (cbOK)
              cbOK();
            return;
          }
          let count = friends.length;

          for (let i = 0; i < count; i++) {
            let friend = friends[i];
            let friend_account = friend.Info_Account;
            let friend_name = '';
            let friend_image = '';
            for (let j in friend.SnsProfileItem) {
              switch (friend.SnsProfileItem[j].Tag) {
                case 'Tag_Profile_IM_Nick':
                  friend_name = friend.SnsProfileItem[j].Value;
                  break;
                case 'Tag_Profile_IM_Image':
                  friend_image = friend.SnsProfileItem[j].Value;
                  break;
              }
            }
            let key = webim.SESSION_TYPE.C2C + "_" + friend_account;
            this.infoMap[key] = {
              name: friend_name,
              image: friend_image,
              selType: webim.SESSION_TYPE.C2C,
              selToID: friend_account
            };
          }
          if (cbOK)
            cbOK();
        }
      },
      (err) => {
        this.popoversServ.presentToast(err.ErrorInfo);
      }
    );
  };
  //将我的群组资料（群名称和群头像）保存在infoMap
  initInfoMapByMyGroups = (cbOK) => {

    let options = {
      'Member_Account': this.loginInfo.identifier,
      'Limit': this.totalCount,
      'Offset': 0,
      'GroupBaseInfoFilter': [
        'Name',
        'FaceUrl'
      ]
    };
    webim.getJoinedGroupListHigh(
      options,
      (resp) => {
        if (resp.GroupIdList && resp.GroupIdList.length) {
          for (let i = 0; i < resp.GroupIdList.length; i++) {
            let group_name = resp.GroupIdList[i].Name;
            let group_image = resp.GroupIdList[i].FaceUrl;
            let key = webim.SESSION_TYPE.GROUP + "_" + resp.GroupIdList[i].GroupId;
            this.infoMap[key] = {
              'name': group_name,
              'image': group_image,
              selType: webim.SESSION_TYPE.GROUP,
              selToID: resp.GroupIdList[i].GroupId
            }
          }
        }
        if (cbOK) {
          cbOK();
        }
      },
      (err) => {
        this.popoversServ.presentToast(err.ErrorInfo);
      }
    );
  };

  //初始化聊天界面左侧最近会话列表
  initRecentContactList = (cbOK, cbErr) => {

    let options = {
      'Count': this.reqRecentSessCount //要拉取的最近会话条数
    };
    webim.getRecentContactList(
      options,
      (resp) => {
        let tempSess: RecentSessMap; //临时会话变量
        let firstSessType; //保存第一个会话类型
        let firstSessId; //保存第一个会话id

        //清空聊天对象列表
        this.recentSessMap = {};

        if (resp.SessionItem && resp.SessionItem.length > 0) { //如果存在最近会话记录
          for (let i in resp.SessionItem) {
            let item = resp.SessionItem[i];
            let type = item.Type; //接口返回的会话类型
            let sessType,
              typeZh,
              sessionId,
              sessionNick = '',
              sessionImage = '',
              senderId = '',
              senderNick = '';
            if (type == webim.RECENT_CONTACT_TYPE.C2C) { //私聊
              typeZh = '私聊';
              sessType = webim.SESSION_TYPE.C2C; //设置会话类型
              sessionId = item.To_Account; //会话id，私聊时为好友ID或者系统账号（值为@TIM#SYSTEM，业务可以自己决定是否需要展示），注意：从To_Account获取,

              if (sessionId == '@TIM#SYSTEM') { //先过滤系统消息，，
                webim.Log.warn('过滤好友系统消息,sessionId=' + sessionId);
                continue;
              }
              let key = sessType + "_" + sessionId;
              let c2cInfo = this.infoMap[key];
              if (c2cInfo && c2cInfo.name) { //从infoMap获取c2c昵称
                sessionNick = c2cInfo.name; //会话昵称，私聊时为好友昵称，接口暂不支持返回，需要业务自己获取（前提是用户设置过自己的昵称，通过拉取好友资料接口（支持批量拉取）得到）
              } else { //没有找到或者没有设置过
                sessionNick = sessionId; //会话昵称，如果昵称为空，默认将其设成会话id
              }
              if (c2cInfo && c2cInfo.image) { //从infoMap获取c2c头像
                sessionImage = c2cInfo.image; //会话头像，私聊时为好友头像，接口暂不支持返回，需要业务自己获取（前提是用户设置过自己的昵称，通过拉取好友资料接口（支持批量拉取）得到）
              } else { //没有找到或者没有设置过
                sessionImage = this.friendHeadUrl; //会话头像，如果为空，默认将其设置demo自带的头像
              }
              senderId = senderNick = ''; //私聊时，这些字段用不到，直接设置为空
            } else if (type == webim.RECENT_CONTACT_TYPE.GROUP) { //群聊
              typeZh = '群聊';
              sessType = webim.SESSION_TYPE.GROUP; //设置会话类型
              sessionId = item.ToAccount; //会话id，群聊时为群ID，注意：从ToAccount获取
              sessionNick = item.GroupNick; //会话昵称，群聊时，为群名称，接口一定会返回

              if (item.GroupImage) { //优先考虑接口返回的群头像
                sessionImage = item.GroupImage; //会话头像，群聊时，群头像，如果业务设置过群头像（设置群头像请参考wiki文档-设置群资料接口），接口会返回
              } else { //接口没有返回或者没有设置过群头像，再从infoMap获取群头像
                let key = sessType + "_" + sessionId;
                let groupInfo = this.infoMap[key];
                if (groupInfo && groupInfo.image) { //
                  sessionImage = groupInfo.image
                } else { //不存在或者没有设置过，则使用默认头像
                  sessionImage = this.groupHeadUrl; //会话头像，如果没有设置过群头像，默认将其设置demo自带的头像
                }
              }
              senderId = item.MsgGroupFrom_Account; //群消息的发送者id

              if (!senderId) { //发送者id为空
                webim.Log.warn('群消息发送者id为空,senderId=' + senderId + ",groupid=" + sessionId);
                continue;
              }
              if (senderId == '@TIM#SYSTEM') { //先过滤群系统消息，因为接口暂时区分不了是进群还是退群等提示消息，
                webim.Log.warn('过滤群系统消息,senderId=' + senderId + ",groupid=" + sessionId);
                continue;
              }

              senderNick = item.MsgGroupFromCardName; //优先考虑群成员名片
              if (!senderNick) { //如果没有设置群成员名片
                senderNick = item.MsgGroupFromNickName; //再考虑接口是否返回了群成员昵称
                if (!senderNick && !sessionNick) { //如果接口没有返回昵称或者没有设置群昵称，从infoMap获取昵称
                  let key = webim.SESSION_TYPE.C2C + "_" + senderId;
                  let c2cInfo = this.infoMap[key];
                  if (c2cInfo && c2cInfo.name) {
                    senderNick = c2cInfo.name; //发送者群昵称
                  } else {
                    sessionNick = senderId; //如果昵称为空，默认将其设成发送者id
                  }
                }
              }

            } else {
              typeZh = '未知类型';
              sessionId = item.ToAccount; //
            }
            if (!sessionId) { //会话id为空
              webim.Log.warn('会话id为空,sessionId=' + sessionId);
              continue;
            }

            if (sessionId == '@TLS#NOT_FOUND') { //会话id不存在，可能是已经被删除了
              webim.Log.warn('会话id不存在,sessionId=' + sessionId);
              continue;
            }

            if (sessionNick.length > this.maxNameLen) { //帐号或昵称过长，截取一部分，出于demo需要，业务可以自己决定
              sessionNick = sessionNick.substr(0, this.maxNameLen) + "...";
            }

            tempSess = this.recentSessMap[sessType + "_" + sessionId];
            if (!tempSess) { //先判断是否存在（用于去重），不存在增加一个

              if (!firstSessId) {
                firstSessType = sessType; //记录第一个会话类型
                firstSessId = sessionId; //记录第一个会话id
              }

              this.recentSessMap[sessType + "_" + sessionId] = {
                SessionType: sessType, //会话类型
                SessionId: sessionId, //会话对象id，好友id或者群id
                SessionNick: sessionNick, //会话昵称，好友昵称或群名称
                SessionImage: sessionImage, //会话头像，好友头像或者群头像
                C2cAccount: senderId, //发送者id，群聊时，才有用
                C2cNick: senderNick, //发送者昵称，群聊时，才有用
                UnreadMsgCount: item.UnreadMsgCount, //未读消息数,私聊时需要通过webim.syncMsgs(initUnreadMsgCount)获取,参考后面的demo，群聊时不需要。
                MsgSeq: item.MsgSeq, //消息seq
                MsgRandom: item.MsgRandom, //消息随机数
                MsgTimeStamp: webim.Tool.formatTimeStamp(item.MsgTimeStamp), //消息时间戳
                MsgGroupReadedSeq: item.MsgGroupReadedSeq || 0,
                MsgShow: item.MsgShow //消息内容,文本消息为原内容，表情消息为[表情],其他类型消息以此类推
              };

              //在左侧最近会话列表框中增加一个会话div
              // addSess(sessType, webim.Tool.formatText2Html(sessionId), webim.Tool.formatText2Html(sessionNick), sessionImage, item.UnreadMsgCount, 'sesslist');
            }

          }
          // 清空聊天界面
          // this.clearMsg();

          webim.syncMsgs(this.initUnreadMsgCount); //初始化最近会话的消息未读数

          if (cbOK) //回调
            cbOK();

        }

      },
      cbErr
    );
  };

  //初始化最近会话的消息未读数
  initUnreadMsgCount = () => {
    let sessMap = webim.MsgStore.sessMap();
    // console.error(sessMap)

    for (let i in sessMap) {
      let sess = sessMap[i];

      //私聊回话未读计数
      if (sess.type() == webim.SESSION_TYPE.C2C && this.recentSessMap[sess.type() + "_" + sess.id()]) {

        this.recentSessMap[sess.type() + "_" + sess.id()].UnreadMsgCount = sess.unread();
      }

      // if (selToID && selToID != sess.id()) { //更新其他聊天对象的未读消息数
      // console.error('sess.unread()', sess.unread())
      // this.updateSess(sess.type(), sess.id(), sess.name(), sess.unread());
      // }
    }
    console.log(this.recentSessMap);
    let sumTotal = 0;//未读总计数
    for (const key in this.recentSessMap) {
      if (this.recentSessMap.hasOwnProperty(key)) {
        const item = this.recentSessMap[key];
        sumTotal += item.UnreadMsgCount;
      }
    }
    this.sumTotal = sumTotal;
  }
  delItem = (item: RecentSessMap) => {
    let selSess = webim.MsgStore.sessByTypeId(item.SessionType, item.SessionId)
    if (item.SessionType == 'C2C') {
      webim.setAutoRead(selSess, true, false)
    } else {
      webim.groupMsgReaded({
        "GroupId": item.SessionId,
        "MsgReadedSeq": selSess ? selSess._impl.curMaxMsgSeq : null
      })
    }
    webim.deleteChat(
      {
        'To_Account': item.SessionId,
        'chatType': item.SessionType == 'C2C' ? 1 : 2
      },
      (resp) => {
        console.log('已经删除' + item.SessionId);
        delete this.recentSessMap[item.SessionType + '_' + item.SessionId];
      }
    );
    // e.preventDefault()
    // e.stopPropagation()
    return false;
  }


  //切换好友或群组聊天对象

  onSelSess(SessionType, SessionId, cbOk?) {


    //设置当前会话的已读消息标记
    // webim.setAutoRead(this.selSess, true, true);

    /* //保存当前的消息输入框内容到草稿
    //获取消息内容
    
    let msgLen = webim.Tool.getStrBytes(msgtosend);
    if (msgLen > 0) {
       webim.Tool.setCookie("tmpmsg_" + this.selToID, msgtosend, 3600);
    } */

    // let tmgmsgtosend = webim.Tool.getCookie("tmpmsg_" + selToID);

    this.selToID = SessionId; //初始化当前聊天对象id

    // bindScrollHistoryEvent.reset();
    this.clearMsg()

    setTimeout(() => {
      if (this.recentSessMap[this.selType + "_" + this.selToID]) {
        var UnreadMsgCount = this.recentSessMap[this.selType + "_" + this.selToID].UnreadMsgCount;
        this.sumTotal = this.sumTotal - UnreadMsgCount;
        this.recentSessMap[this.selType + "_" + this.selToID].UnreadMsgCount = 0;
      }
    }, 300);

    let sessMap = webim.MsgStore.sessMap(); //获取到之前已经保存的消息
    let sessCS = webim.SESSION_TYPE.GROUP + this.selToID;
    if (sessMap && sessMap[sessCS]) { //判断之前是否保存过消息
      this.selType = webim.SESSION_TYPE.GROUP
      // bindScrollHistoryEvent.init();

      let compare = (property) => {
        return (a, b) => {
          let value1 = a[property];
          let value2 = b[property];
          return value1 - value2;
        }
      }
      this.selSess = webim.MsgStore.sessByTypeId(this.selType, this.selToID);
      // console.log(this.selSess)
      webim.setAutoRead(this.selSess, true, true);

      let sessMapOld = sessMap[sessCS]._impl.msgs.sort(compare('time'));
      for (let i = 0; i < sessMapOld.length; i++) {
        this.addMsg(sessMapOld[i], false); //显示已经保存的消息
      }
    } else {
      if (SessionType == webim.SESSION_TYPE.GROUP) {
        if (this.selType == webim.SESSION_TYPE.C2C) {
          this.selType = webim.SESSION_TYPE.GROUP;
        }
        this.selSess = null;
        webim.MsgStore.delSessByTypeId(this.selType, this.selToID);

        this.getLastGroupHistoryMsgs((msgList) => {
          this.getHistoryMsgCallback(msgList, false);
          // bindScrollHistoryEvent.init();
        }, (err) => {
          this.popoversServ.presentToast(err.ErrorInfo);
        });

      } else {
        if (this.selType == webim.SESSION_TYPE.GROUP) {
          this.selType = webim.SESSION_TYPE.C2C;
        }
        //如果是管理员账号，则为全员推送，没有历史消息
        if (this.selToID == this.AdminAcount) {
          let sess = webim.MsgStore.sessByTypeId(this.selType, this.selToID);
          if (sess && sess.msgs() && sess.msgs().length > 0) {
            this.getHistoryMsgCallback(sess.msgs(), false);
          } else {
            this.getLastC2CHistoryMsgs((msgList) => {
              this.getHistoryMsgCallback(msgList, false);
              // bindScrollHistoryEvent.init();
            }, (err) => {
              this.popoversServ.presentToast(err.ErrorInfo);
            });
          }
          return;
        }

        //拉取漫游消息
        this.getLastC2CHistoryMsgs((msgList) => {
          this.getHistoryMsgCallback(msgList, false);
          //绑定滚动操作
          // bindScrollHistoryEvent.init();
        }, (err) => {
          this.popoversServ.presentToast(err.ErrorInfo);
        });
      }
    }
  }

  //清空聊天界面
  clearMsg() {
    this.currMsg = [];
  }
  //获取历史消息(c2c或者group)成功回调函数
  //msgList 为消息数组，结构为[Msg]
  getHistoryMsgCallback(msgList, prepage) {
    let msg;
    prepage = prepage || false;

    //如果是加载前几页的消息，消息体需要prepend，所以先倒排一下
    if (prepage) {
      msgList.reverse();
    } else {

    }

    for (let j in msgList) { //遍历新消息
      msg = msgList[j];
      if (msg.getSession().id() == this.selToID) { //为当前聊天对象的消息
        this.selSess = msg.getSession();
        //在聊天窗体中新增一条消息
        this.addMsg(msg, prepage);
      }
    }

    //消息已读上报，并将当前会话的消息设置成自动已读
    webim.setAutoRead(this.selSess, true, true);

  }
  //获取最新的c2c历史消息,用于切换好友聊天，重新拉取好友的聊天消息
  getLastC2CHistoryMsgs = (cbOk, cbError) => {
    if (this.selType == webim.SESSION_TYPE.GROUP) {
      this.popoversServ.presentToast('当前的聊天类型为群聊天，不能进行拉取好友历史消息操作');
      return;
    }
    if (!this.selToID || this.selToID == '@TIM#SYSTEM') {
      this.popoversServ.presentToast('当前的聊天id非法，selToID=' + this.selToID);
      return;
    }
    let lastMsgTime = 0; //第一次拉取好友历史消息时，必须传0
    let msgKey = '';
    let options = {
      'Peer_Account': this.selToID, //好友帐号
      'MaxCnt': this.reqMsgCount, //拉取消息条数
      'LastMsgTime': lastMsgTime, //最近的消息时间，即从这个时间点向前拉取历史消息
      'MsgKey': msgKey
    };
    this.selSess = null;
    webim.MsgStore.delSessByTypeId(this.selType, this.selToID);


    webim.getC2CHistoryMsgs(
      options,
      (resp) => {
        let complete = resp.Complete; //是否还有历史消息可以拉取，1-表示没有，0-表示有

        if (resp.MsgList.length == 0) {
          webim.Log.warn("没有历史消息了:data=" + JSON.stringify(options));
          return;
        }
        this.getPrePageC2CHistroyMsgInfoMap[this.selToID] = { //保留服务器返回的最近消息时间和消息Key,用于下次向前拉取历史消息
          'LastMsgTime': resp.LastMsgTime,
          'MsgKey': resp.MsgKey
        };
        //清空聊天界面
        this.clearMsg()

        if (cbOk)
          cbOk(resp.MsgList);
      },
      cbError
    );
  };

  //向上翻页，获取更早的好友历史消息
  getPrePageC2CHistoryMsgs = (cbOk?, cbError?) => {
    if (this.selType == webim.SESSION_TYPE.GROUP) {
      this.popoversServ.presentToast('当前的聊天类型为群聊天，不能进行拉取好友历史消息操作');
      return;
    }
    let tempInfo = this.getPrePageC2CHistroyMsgInfoMap[this.selToID]; //获取下一次拉取的c2c消息时间和消息Key
    let lastMsgTime: any;
    let msgKey: any;
    if (tempInfo) {
      lastMsgTime = tempInfo.LastMsgTime;
      msgKey = tempInfo.MsgKey;
    } else {
      this.popoversServ.presentToast('获取下一次拉取的c2c消息时间和消息Key为空');
      return;
    }
    let options = {
      'Peer_Account': this.selToID, //好友帐号
      'MaxCnt': this.reqMsgCount, //拉取消息条数
      'LastMsgTime': lastMsgTime, //最近的消息时间，即从这个时间点向前拉取历史消息
      'MsgKey': msgKey
    };
    webim.getC2CHistoryMsgs(
      options,
      (resp) => {
        let complete = resp.Complete; //是否还有历史消息可以拉取，1-表示没有，0-表示有
        if (resp.MsgList.length == 0) {
          webim.Log.warn("没有历史消息了:data=" + JSON.stringify(options));
          return;
        }
        this.getPrePageC2CHistroyMsgInfoMap[this.selToID] = { //保留服务器返回的最近消息时间和消息Key,用于下次向前拉取历史消息
          'LastMsgTime': resp.LastMsgTime,
          'MsgKey': resp.MsgKey
        };
        if (cbOk) {
          cbOk(resp.MsgList);
        } else {
          this.getHistoryMsgCallback(resp.MsgList, true);
        }
      },
      cbError
    );
  };

  //获取最新的群历史消息,用于切换群组聊天时，重新拉取群组的聊天消息
  getLastGroupHistoryMsgs = (cbOk, cbErr) => {
    if (this.selType == webim.SESSION_TYPE.C2C) {
      this.popoversServ.presentToast('当前的聊天类型为好友聊天，不能进行拉取群历史消息操作');
      return;
    }
    this.getGroupInfo(this.selToID, (resp) => {
      //拉取最新的群历史消息
      let options = {
        'GroupId': this.selToID,
        'ReqMsgSeq': resp.GroupInfo[0].NextMsgSeq - 1,
        'ReqMsgNumber': this.reqMsgCount
      };
      if (options.ReqMsgSeq == null || options.ReqMsgSeq == undefined || options.ReqMsgSeq <= 0) {
        webim.Log.warn("该群还没有历史消息:options=" + JSON.stringify(options));
        return;
      }
      this.selSess = null;
      webim.MsgStore.delSessByTypeId(this.selType, this.selToID);
      // this.recentSessMap[webim.SESSION_TYPE.GROUP + "_" + this.selToID] = {};

      if (this.recentSessMap[webim.SESSION_TYPE.GROUP + "_" + this.selToID])
        this.recentSessMap[webim.SESSION_TYPE.GROUP + "_" + this.selToID].MsgGroupReadedSeq = resp.GroupInfo && resp.GroupInfo[0] && resp.GroupInfo[0].MsgSeq;

      webim.syncGroupMsgs(
        options,
        (msgList) => {
          if (msgList.length == 0) {
            webim.Log.warn("该群没有历史消息了:options=" + JSON.stringify(options));
            return;
          }
          let msgSeq = msgList[0].seq - 1;
          this.getPrePageGroupHistroyMsgInfoMap[this.selToID] = {
            "ReqMsgSeq": msgSeq
          };
          //清空聊天界面
          this.clearMsg();
          if (cbOk)
            cbOk(msgList);
        },
        (err) => {
          this.popoversServ.presentToast(err.ErrorInfo);
        }
      );
    }, () => {

    });
  };

  //向上翻页，获取更早的群历史消息
  getPrePageGroupHistoryMsgs = (cbOk?) => {
    if (this.selType == webim.SESSION_TYPE.C2C) {
      this.popoversServ.presentToast('当前的聊天类型为好友聊天，不能进行拉取群历史消息操作');
      return;
    }
    let tempInfo = this.getPrePageGroupHistroyMsgInfoMap[this.selToID]; //获取下一次拉取的群消息seq
    let reqMsgSeq;
    if (tempInfo) {
      reqMsgSeq = tempInfo.ReqMsgSeq;
      if (reqMsgSeq <= 0) {
        webim.Log.warn('该群没有历史消息可拉取了');
        return;
      }
    } else {
      webim.Log.error('获取下一次拉取的群消息seq为空');
      return;
    }
    let options = {
      'GroupId': this.selToID,
      'ReqMsgSeq': reqMsgSeq,
      'ReqMsgNumber': this.reqMsgCount
    };

    webim.syncGroupMsgs(
      options,
      (msgList) => {
        if (msgList.length == 0) {
          webim.Log.warn("该群没有历史消息了:options=" + JSON.stringify(options));
          return;
        }
        let msgSeq = msgList[0].seq - 1;
        this.getPrePageGroupHistroyMsgInfoMap[this.selToID] = {
          "ReqMsgSeq": msgSeq
        };

        if (cbOk) {
          cbOk(msgList);
        } else {
          this.getHistoryMsgCallback(msgList, true);
        }
      },
      (err) => {
        this.popoversServ.presentToast(err.ErrorInfo);
      }
    );
  };


  //读取群组基本资料-高级接口
  getGroupInfo = (group_id, cbOK, cbErr) => {
    let options = {
      'GroupIdList': [
        group_id
      ],
      'GroupBaseInfoFilter': [
        'Type',
        'Name',
        'Introduction',
        'Notification',
        'FaceUrl',
        'CreateTime',
        'Owner_Account',
        'LastInfoTime',
        'LastMsgTime',
        'NextMsgSeq',
        'MemberNum',
        'MaxMemberNum',
        'ApplyJoinOption',
        'ShutUpAllMember'
      ],
      'MemberInfoFilter': [
        'Account',
        'Role',
        'JoinTime',
        'LastSendMsgTime',
        'ShutUpUntil'
      ]
    };
    webim.getGroupInfo(
      options,
      (resp) => {
        if (resp.GroupInfo[0].ShutUpAllMember == 'On') {
          this.popoversServ.presentToast('该群组已开启全局禁言');
        }
        if (cbOK) {
          cbOK(resp);
        }
      },
      (err) => {
        if (cbErr) {
          cbErr(err);
        }
        this.popoversServ.presentToast(err.ErrorInfo);
      }
    );
  };
  currMsg: Array<any> = [];//当前

  addMsg(msg, prepend) {

    let isSelfSend: any,
      fromAccount: string,
      fromAccountNick: string,
      fromAccountImage: string,
      sessType: any,
      subType: any,
      msgContent: any;

    //获取会话类型，目前只支持群聊
    //webim.SESSION_TYPE.GROUP-群聊，
    //webim.SESSION_TYPE.C2C-私聊，
    sessType = msg.getSession().type();

    isSelfSend = msg.getIsSend(); //消息是否为自己发的

    fromAccount = msg.getFromAccount();
    if (!fromAccount) {
      return;
    }
    if (isSelfSend) { //如果是自己发的消息
      if (this.loginInfo.identifierNick) {
        fromAccountNick = this.loginInfo.identifierNick;
      } else {
        fromAccountNick = fromAccount;
      }
      //获取头像
      if (this.loginInfo.headurl) {
        fromAccountImage = this.loginInfo.headurl;
      } else {
        fromAccountImage = this.friendHeadUrl;
      }
    } else { //如果别人发的消息
      let key = webim.SESSION_TYPE.C2C + "_" + fromAccount;
      let info = this.infoMap[key];
      if (info && info.name) {
        fromAccountNick = info.name;
      } else if (msg.getFromAccountNick()) {
        fromAccountNick = msg.getFromAccountNick();
      } else {
        fromAccountNick = fromAccount;
      }
      //获取头像
      if (info && info.image) {
        fromAccountImage = info.image;
      } else if (msg.fromAccountHeadurl) {
        fromAccountImage = msg.fromAccountHeadurl;
      } else {
        fromAccountImage = this.friendHeadUrl;
      }
    }

    //过滤系统通知
    if ('@TIM#SYSTEM' == fromAccountNick) {
      return;
    }
    //解析消息

    //获取消息子类型
    //会话类型为群聊时，子类型为：webim.GROUP_MSG_SUB_TYPE
    //会话类型为私聊时，子类型为：webim.C2C_MSG_SUB_TYPE
    subType = msg.getSubType();


    switch (subType) {

      case webim.GROUP_MSG_SUB_TYPE.COMMON: //群普通消息
        msgContent = this.convertMsgtoHtml(msg);
        break;
      case webim.GROUP_MSG_SUB_TYPE.REDPACKET: //群红包消息
        msgContent = "[群红包消息]" + this.convertMsgtoHtml(msg);
        break;
      case webim.GROUP_MSG_SUB_TYPE.LOVEMSG: //群点赞消息
        //业务自己可以增加逻辑，比如展示点赞动画效果
        msgContent = "[群点赞消息]" + this.convertMsgtoHtml(msg);
        //展示点赞动画
        //showLoveMsgAnimation();
        break;
      case webim.GROUP_MSG_SUB_TYPE.TIP: //群提示消息
        msgContent = "[群提示消息]" + this.convertMsgtoHtml(msg);
        break;
    }
    if (msg.sending) {

    } else {
      this.currMsg.forEach((item, index) => {//修改正在发送的消息
        if (item.random == msg.random) {
          this.currMsg.splice(index, 1);
        }
      });
    }
    let msgItem: any = {
      originMsgData: msg,
      fromAccountNick: fromAccountNick,
      fromAccountImage: fromAccountImage,
      isSelfSend: isSelfSend,
      sessType: sessType,
      time: webim.Tool.formatTimeStamp(msg.getTime()),
      sending: msg.sending,
      msgContent: msgContent,
      random: msg.random,
    }
    for (let i = 0; i < msg.getElems().length; i++) {
      let elem = msg.getElems()[i];
      let type = elem.getType(); //获取元素类型
      let content = elem.getContent(); //获取元素对象
      switch (type) {
        case webim.MSG_ELEMENT_TYPE.CUSTOM:
          msgItem.msg_element_type = 'CUSTOM';
          let ext = content.getExt(); //扩展信息
          let strs = ext.split("&");
          for (let i = 0; i < strs.length; i++) {
            let result = strs[i].split("=");
            let key = result[0];
            let value = result[1];
            msgItem.custom[key] = value;
          }
          msgItem.msgContent = null;
          break;
        case webim.MSG_ELEMENT_TYPE.FILE:
          msgItem.msg_element_type = 'FILE';
          let fileSize, unitStr;
          fileSize = content.getSize();
          unitStr = "Byte";
          if (fileSize >= 1024) {
            fileSize = Math.round(fileSize / 1024);
            unitStr = "KB";
          }
          msgItem.file = {
            uuid: content.uuid,
            name: content.name,
            fileSize: fileSize,
            unitStr: unitStr
          };
          msgItem.msgContent = null;
          break;
        case webim.MSG_ELEMENT_TYPE.IMAGE:
            msgItem.msg_element_type = 'IMAGE';
            if (i <= msg.getElems().length - 2) {
            let customMsgElem = msg.getElems()[i + 1]; //获取保存图片名称的自定义消息elem
            let imgName = customMsgElem.getContent().getData(); //业务可以自定义保存字段，demo中采用data字段保存图片文件名
            msgItem.elem = this.convertImageMsgToHtml(content, imgName);
            i++; //下标向后移一位
          } else {
            msgItem.elem = this.convertImageMsgToHtml(content, null);
          }
          msgItem.msgContent = null;
          break;
        default:
          webim.Log.error('未知消息元素类型: elemType=' + type);
          break;
      }
    }

    if (prepend) {
      this.currMsg.unshift(msgItem);
    } else {
      this.currMsg.push(msgItem);
      setTimeout(() => {
        this.event.publish('im:addMsg');
      }, 100);
    }
  }
  onDownFile(uuid) {
    let downFileUrl = webim.downFileUrl(uuid);
    this.ib.create(downFileUrl, '_system');
  }
  //把消息转换成Html

  convertMsgtoHtml(msg) {
    let html = "", elems, elem, type, content, eleHtml;
    elems = msg.getElems(); //获取消息包含的元素数组
    let count = elems.length;
    for (let i = 0; i < count; i++) {
      elem = elems[i];
      type = elem.getType(); //获取元素类型
      content = elem.getContent(); //获取元素对象
      switch (type) {
        case webim.MSG_ELEMENT_TYPE.TEXT:
          eleHtml = this.convertTextMsgToHtml(content);
          //转义，防XSS
          html += webim.Tool.formatText2Html(eleHtml);
          break;
        case webim.MSG_ELEMENT_TYPE.FACE:
          html += this.convertFaceMsgToHtml(content);
          break;
        case webim.MSG_ELEMENT_TYPE.IMAGE:
          if (i <= count - 2) {
            let customMsgElem = elems[i + 1]; //获取保存图片名称的自定义消息elem
            let imgName = customMsgElem.getContent().getData(); //业务可以自定义保存字段，demo中采用data字段保存图片文件名
            html += this.convertImageMsgToHtml(content, imgName);
            i++; //下标向后移一位
          } else {
            html += this.convertImageMsgToHtml(content, null);
          }
          break;
        case webim.MSG_ELEMENT_TYPE.SOUND:
          html += this.convertSoundMsgToHtml(content);
          break;
        case webim.MSG_ELEMENT_TYPE.FILE:
          html += this.convertFileMsgToHtml(content);
          break;
        case webim.MSG_ELEMENT_TYPE.LOCATION:
          html += this.convertLocationMsgToHtml(content);
          break;
        case webim.MSG_ELEMENT_TYPE.CUSTOM:
          eleHtml = this.convertCustomMsgToHtml(content);
          //转义，防XSS
          html += (eleHtml);
          break;
        case webim.MSG_ELEMENT_TYPE.GROUP_TIP:
          eleHtml = this.convertGroupTipMsgToHtml(content);
          //转义，防XSS
          html += webim.Tool.formatText2Html(eleHtml);
          break;
        default:
          webim.Log.error('未知消息元素类型: elemType=' + type);
          break;
      }
    }
    return html;
  }

  //解析文本消息元素

  convertTextMsgToHtml(content) {
    return content.getText();
  }
  //解析表情消息元素

  convertFaceMsgToHtml(content) {
    let faceUrl = null;
    let data = content.getData();
    let index = webim.EmotionDataIndexs[data];

    let emotion = webim.Emotions[index];
    if (emotion && emotion[1]) {
      faceUrl = emotion[1];
    }
    if (faceUrl) {
      return "<img src='" + faceUrl + "'/>";
    } else {
      return data;
    }
  }
  //解析图片消息元素

  convertImageMsgToHtml = (content, imageName) => {
    let smallImage = content.getImage(webim.IMAGE_TYPE.SMALL); //小图
    let bigImage = content.getImage(webim.IMAGE_TYPE.LARGE); //大图
    let oriImage = content.getImage(webim.IMAGE_TYPE.ORIGIN); //原图
    if (!bigImage) {
      bigImage = smallImage;
    }
    if (!oriImage) {
      oriImage = smallImage;
    }
    return {
      imageName:imageName,
      smallImage:smallImage.getUrl(),
      bigImage:bigImage.getUrl(),
      oriImage:oriImage.getUrl(),
      id:content.getImageId()
    }
    // return "<img name='" + imageName + "' src='" + smallImage.getUrl() + "#" + bigImage.getUrl() + "#" + oriImage.getUrl() + "' style='cursor: pointer;' id='" + content.getImageId() + "' bigImgUrl='" + bigImage.getUrl() + "' (click)='imageClick(this)' />";
  }
  //解析语音消息元素

  convertSoundMsgToHtml(content) {
    let second = content.getSecond(); //获取语音时长
    let downUrl = content.getDownUrl();
    if (webim.BROWSER_INFO.type == 'ie' && parseInt(webim.BROWSER_INFO.ver) <= 8) {
      return '[这是一条语音消息]demo暂不支持ie8(含)以下浏览器播放语音,语音URL:' + downUrl;
    }
    return '<audio id="uuid_' + content.uuid + '" src="' + downUrl + '" controls="controls" onplay="onChangePlayAudio(this)" preload="none"></audio>';
  }
  //解析文件消息元素

  convertFileMsgToHtml(content) {
    let fileSize, unitStr;
    fileSize = content.getSize();
    unitStr = "Byte";
    if (fileSize >= 1024) {
      fileSize = Math.round(fileSize / 1024);
      unitStr = "KB";
    }
    // return '<a href="' + content.getDownUrl() + '" title="点击下载文件" ><i class="glyphicon glyphicon-file">&nbsp;' + content.getName() + '(' + fileSize + unitStr + ')</i></a>';

    return '<a href="javascript:;" onclick=\'webim.onDownFile("' + content.uuid + '")\' title="点击下载文件" ><i class="glyphicon glyphicon-file">&nbsp;' + content.name + '(' + fileSize + unitStr + ')</i></a>';
  }
  //解析位置消息元素

  convertLocationMsgToHtml(content) {
    return '经度=' + content.getLongitude() + ',纬度=' + content.getLatitude() + ',描述=' + content.getDesc();
  }
  //解析自定义消息元素

  convertCustomMsgToHtml(content) {
    let data = content.getData(); //自定义数据
    let desc = content.getDesc(); //描述信息
    let ext = content.getExt(); //扩展信息
    let strs = ext.split("&");
    let param: any = {}
    for (let i = 0; i < strs.length; i++) {
      let result = strs[i].split("=");
      let key = result[0];
      let value = result[1];
      param[key] = value;
    }

    return "<a data-goodsid='" + param.goods_id + "' class='goods'><img data-goodsid='" + param.goods_id + "' src='" + param.img + "' /><div class='name' data-goodsid='" + param.goods_id + "'>" + param.goods_name + "</div></a>";
  }
  //解析群提示消息元素

  convertGroupTipMsgToHtml(content) {
    let WEB_IM_GROUP_TIP_MAX_USER_COUNT = 10;
    let text = "";
    let maxIndex = WEB_IM_GROUP_TIP_MAX_USER_COUNT - 1;
    let opType, opUserId, userIdList;
    let groupMemberNum;
    opType = content.getOpType(); //群提示消息类型（操作类型）
    opUserId = content.getOpUserId(); //操作人id
    switch (opType) {
      case webim.GROUP_TIP_TYPE.JOIN: //加入群
        userIdList = content.getUserIdList();
        //text += opUserId + "邀请了";
        for (let m in userIdList) {
          text += userIdList[m] + ",";
          if (userIdList.length > WEB_IM_GROUP_TIP_MAX_USER_COUNT && m == String(maxIndex)) {
            text += "等" + userIdList.length + "人";
            break;
          }
        }
        text = text.substring(0, text.length - 1);
        text += "加入该群，当前群成员数：" + content.getGroupMemberNum();
        break;
      case webim.GROUP_TIP_TYPE.QUIT: //退出群
        text += opUserId + "离开该群，当前群成员数：" + content.getGroupMemberNum();
        break;
      case webim.GROUP_TIP_TYPE.KICK: //踢出群
        text += opUserId + "将";
        userIdList = content.getUserIdList();
        for (let m in userIdList) {
          text += userIdList[m] + ",";
          if (userIdList.length > WEB_IM_GROUP_TIP_MAX_USER_COUNT && m == String(maxIndex)) {
            text += "等" + userIdList.length + "人";
            break;
          }
        }
        text += "踢出该群";
        break;
      case webim.GROUP_TIP_TYPE.SET_ADMIN: //设置管理员
        text += opUserId + "将";
        userIdList = content.getUserIdList();
        for (let m in userIdList) {
          text += userIdList[m] + ",";
          if (userIdList.length > WEB_IM_GROUP_TIP_MAX_USER_COUNT && m == String(maxIndex)) {
            text += "等" + userIdList.length + "人";
            break;
          }
        }
        text += "设为管理员";
        break;
      case webim.GROUP_TIP_TYPE.CANCEL_ADMIN: //取消管理员
        text += opUserId + "取消";
        userIdList = content.getUserIdList();
        for (let m in userIdList) {
          text += userIdList[m] + ",";
          if (userIdList.length > WEB_IM_GROUP_TIP_MAX_USER_COUNT && m == String(maxIndex)) {
            text += "等" + userIdList.length + "人";
            break;
          }
        }
        text += "的管理员资格";
        break;

      case webim.GROUP_TIP_TYPE.MODIFY_GROUP_INFO: //群资料变更
        text += opUserId + "修改了群资料：";
        let groupInfoList = content.getGroupInfoList();
        let type, value;
        for (let m in groupInfoList) {
          type = groupInfoList[m].getType();
          value = groupInfoList[m].getValue();
          switch (type) {
            case webim.GROUP_TIP_MODIFY_GROUP_INFO_TYPE.FACE_URL:
              text += "群头像为" + value + "; ";
              break;
            case webim.GROUP_TIP_MODIFY_GROUP_INFO_TYPE.NAME:
              text += "群名称为" + value + "; ";
              break;
            case webim.GROUP_TIP_MODIFY_GROUP_INFO_TYPE.OWNER:
              text += "群主为" + value + "; ";
              break;
            case webim.GROUP_TIP_MODIFY_GROUP_INFO_TYPE.NOTIFICATION:
              text += "群公告为" + value + "; ";
              break;
            case webim.GROUP_TIP_MODIFY_GROUP_INFO_TYPE.INTRODUCTION:
              text += "群简介为" + value + "; ";
              break;
            default:
              text += "未知信息为:type=" + type + ",value=" + value + "; ";
              break;
          }
        }
        break;

      case webim.GROUP_TIP_TYPE.MODIFY_MEMBER_INFO: //群成员资料变更(禁言时间)
        text += opUserId + "修改了群成员资料:";
        let memberInfoList = content.getMemberInfoList();
        let userId, shutupTime;
        for (let m in memberInfoList) {
          userId = memberInfoList[m].getUserId();
          shutupTime = memberInfoList[m].getShutupTime();
          text += userId + ": ";
          if (shutupTime != null && shutupTime !== undefined) {
            if (shutupTime == 0) {
              text += "取消禁言; ";
            } else {
              text += "禁言" + shutupTime + "秒; ";
            }
          } else {
            text += " shutupTime为空";
          }
          if (memberInfoList.length > WEB_IM_GROUP_TIP_MAX_USER_COUNT && m == String(maxIndex)) {
            text += "等" + memberInfoList.length + "人";
            break;
          }
        }
        break;
      default:
        text += "未知群提示消息类型：type=" + opType;
        break;
    }
    return text;
  }
  //发送消息(文本或者表情)

  onSendMsg(msgContent, cbOK?) {

    /* if (!this.selToID) {
       this.popoversServ.presentToast("你还没有选中好友或者群组，暂不能聊天");
       return;
    } */
    //获取消息内容
    let msgLen = webim.Tool.getStrBytes(msgContent);

    if (msgContent.length < 1) {

    }
    let maxLen, errInfo;
    if (this.selType == webim.SESSION_TYPE.C2C) {
      maxLen = webim.MSG_MAX_LENGTH.C2C;
      errInfo = "消息长度超出限制(最多" + Math.round(maxLen / 3) + "汉字)";
    } else {
      maxLen = webim.MSG_MAX_LENGTH.GROUP;
      errInfo = "消息长度超出限制(最多" + Math.round(maxLen / 3) + "汉字)";
    }
    if (msgLen > maxLen) {
      // this.popoversServ.presentToast(errInfo);
      return;
    }
    //发消息处理
    this.handleMsgSend(msgContent);
  }


  handleMsgSend(msgContent) {
    let selSess = new webim.Session(this.selType, this.selToID, this.selToID, this.friendHeadUrl, Math.round(new Date().getTime() / 1000));
    let isSend = true; //是否为自己发送
    let seq = -1; //消息序列，-1表示sdk自动生成，用于去重
    let random = Math.round(Math.random() * 4294967296); //消息随机数，用于去重
    let msgTime = Math.round(new Date().getTime() / 1000); //消息时间戳
    let subType; //消息子类型
    if (this.selType == webim.SESSION_TYPE.C2C) {
      subType = webim.C2C_MSG_SUB_TYPE.COMMON;
    } else {
      //webim.GROUP_MSG_SUB_TYPE.COMMON-普通消息,
      //webim.GROUP_MSG_SUB_TYPE.LOVEMSG-点赞消息，优先级最低
      //webim.GROUP_MSG_SUB_TYPE.TIP-提示消息(不支持发送，用于区分群消息子类型)，
      //webim.GROUP_MSG_SUB_TYPE.REDPACKET-红包消息，优先级最高
      subType = webim.GROUP_MSG_SUB_TYPE.COMMON;
    }
    let msg = new webim.Msg(selSess, isSend, seq, random, msgTime, this.loginInfo.identifier, subType, this.loginInfo.identifierNick);

    let text_obj, face_obj, tmsg, emotionIndex, emotion, restMsgIndex;
    //解析文本和表情
    let expr = /\[[^[\]]{1,3}\]/mg;
    let emotions = msgContent.match(expr);
    if (!emotions || emotions.length < 1) {
      text_obj = new webim.Msg.Elem.Text(msgContent);
      msg.addText(text_obj);
    } else {
      for (let i = 0; i < emotions.length; i++) {
        tmsg = msgContent.substring(0, msgContent.indexOf(emotions[i]));
        if (tmsg) {
          text_obj = new webim.Msg.Elem.Text(tmsg);
          msg.addText(text_obj);
        }
        emotionIndex = webim.EmotionDataIndexs[emotions[i]];
        emotion = webim.Emotions[emotionIndex];

        if (emotion) {
          face_obj = new webim.Msg.Elem.Face(emotionIndex, emotions[i]);
          msg.addFace(face_obj);
        } else {
          text_obj = new webim.Msg.Elem.Text(emotions[i]);
          msg.addText(text_obj);
        }
        restMsgIndex = msgContent.indexOf(emotions[i]) + emotions[i].length;
        msgContent = msgContent.substring(restMsgIndex);
      }
      if (msgContent) {
        text_obj = new webim.Msg.Elem.Text(msgContent);
        msg.addText(text_obj);
      }
    }

    msg.PushInfo = {
      "PushFlag": 0,
      "Desc": '测试离线推送内容', //离线推送内容
      "Ext": '测试离线推送透传内容', //离线推送透传内容
      "AndroidInfo": {
        "Sound": "android.mp3" //离线推送声音文件路径。
      },
      "ApnsInfo": {
        "Sound": "apns.mp3", //离线推送声音文件路径。
        "BadgeMode": 1
      }
    };

    msg.PushInfoBoolean = true; //是否开启离线推送push同步
    msg.sending = 1;
    msg.originContent = msgContent;
    this.addMsg(msg, false);

    webim.sendMsg(msg, (resp) => {
      //发送成功，把sending清理
      this.currMsg.forEach((item, index) => {//修改正在发送的消息
        if (item.random == msg.random) {
          this.currMsg[index].sending = 0;
        }
      });
      // webim.Tool.setCookie("tmpmsg_" + this.selToID, '', 0);
    }, (err) => {
      //提示重发
      this.currMsg.forEach((item, index) => {//
        if (item.random == msg.random) {
          this.currMsg[index].sending = 0;
          this.currMsg[index].sendErr = 1;
        }
      });
    });
  }

  showReSend(msg, random) {
    this.currMsg.forEach((item, index) => {//
      if (item.random == random) {
        this.currMsg.splice(index, 1);
      }
    });
    this.handleMsgSend(msg);
  }
  getEmotions() {
    let arr = [];
    for (let index in webim.Emotions) {
      arr.push(webim.Emotions[index]);
    }
    return arr;
  }
  fileOnChange(uploadFile) {
    console.log(uploadFile)

    let file = uploadFile.files[0];
    let fileSize = file.size;

    //先检查图片类型和大小
    if (!this.checkPic(uploadFile, fileSize)) {
      return;
    }

    //预览图片
    let reader = new FileReader();
    reader.onload = ((file) => {
      return (e) => {
        // span.innerHTML = '<img class="img-responsive" src="' + this.result + '" alt="' + file.name + '" />';
      };
    })(file);
    //预览图片
    reader.readAsDataURL(file);

    this.uploadPic(file);
  }

  //上传图片

  uploadPic(file) {
    let businessType; //业务类型，1-发群图片，2-向好友发图片
    if (this.selType == webim.SESSION_TYPE.C2C) { //向好友发图片
      businessType = webim.UPLOAD_PIC_BUSSINESS_TYPE.C2C_MSG;
    } else if (this.selType == webim.SESSION_TYPE.GROUP) { //发群图片
      businessType = webim.UPLOAD_PIC_BUSSINESS_TYPE.GROUP_MSG;
    }
    //封装上传图片请求
    let opt = {
      'file': file, //图片对象
      'onProgressCallBack': this.onProgressCallBack, //上传图片进度条回调函数
      //'abortButton': document.getElementById('upd_abort'), //停止上传图片按钮
      'To_Account': this.selToID, //接收者
      'businessType': businessType //业务类型
    };
    //上传图片
    webim.uploadPic(opt,
      (resp) => {
        //上传成功发送图片
        this.sendPic(resp, file.name);
      },
      (err) => {
        this.popoversServ.presentToast(err.ErrorInfo);
      }
    );
  }
  //发送图片消息
  sendPic(images, imgName) {
    console.debug('sendPic', imgName);
    if (!this.selToID) {
      this.popoversServ.presentToast("您还没有好友，暂不能聊天");
      return;
    }

    let selSess = new webim.Session(this.selType, this.selToID, this.selToID, this.friendHeadUrl, Math.round(new Date().getTime() / 1000));
    let msg = new webim.Msg(selSess, true, -1, -1, -1, this.loginInfo.identifier, 0, this.loginInfo.identifierNick);

    console.debug(imgName.split(".")[1]);
    let images_obj = new webim.Msg.Elem.Images(images.File_UUID, imgName.split(".")[1]);
    for (let i in images.URL_INFO) {
      let img = images.URL_INFO[i];
      let newImg;
      let type;
      switch (img.PIC_TYPE) {
        case 1: //原图
          type = 1; //原图
          break;
        case 2: //小图（缩略图）
          type = 3; //小图
          break;
        case 4: //大图
          type = 2; //大图
          break;
      }
      newImg = new webim.Msg.Elem.Images.Image(type, img.PIC_Size, img.PIC_Width, img.PIC_Height, img.DownUrl);
      images_obj.addImage(newImg);
    }
    msg.addImage(images_obj);
    //if(imgName){
    //    let data=imgName;//通过自定义消息中的data字段保存图片名称
    //    let custom_obj = new webim.Msg.Elem.Custom(data, '', '');
    //    msg.addCustom(custom_obj);
    //}
    //调用发送图片消息接口
    webim.sendMsg(msg, (resp) => {
      if (this.selType == webim.SESSION_TYPE.C2C) { //私聊时，在聊天窗口手动添加一条发的消息，群聊时，长轮询接口会返回自己发的消息
        this.addMsg(msg, false);
      }
    }, (err) => {
      this.popoversServ.presentToast(err.ErrorInfo);
    });
  }

  //上传图片进度条回调函数
  //loadedSize-已上传字节数
  //totalSize-图片总字节数

  onProgressCallBack(loadedSize, totalSize) {
    return (loadedSize / totalSize) * 100;
  }
  //检查文件类型和大小

  checkPic(obj, fileSize) {
    let picExts = 'jpg|jpeg|png|bmp|gif|webp';
    let photoExt = obj.value.substr(obj.value.lastIndexOf(".") + 1).toLowerCase(); //获得文件后缀名
    let pos = picExts.indexOf(photoExt);
    if (pos < 0) {
      this.popoversServ.presentToast("您选中的文件不是图片，请重新选择");
      return false;
    }
    fileSize = Math.round(fileSize / 1024 * 100) / 100; //单位为KB
    if (fileSize > 30 * 1024) {
      this.popoversServ.presentToast("您选择的图片大小超过限制(最大为30M)，请重新选择");
      return false;
    }
    return true;
  }
  //弹出发文件对话框
  selectFileClick() {
    //判断浏览器版本
    if (webim.BROWSER_INFO.type == 'ie' && parseInt(webim.BROWSER_INFO.ver) <= 9) {
      this.popoversServ.presentToast('上传文件暂不支持ie9(含)以下浏览器');
    } else {
    }
  }

  //上传文件进度条回调函数
  //loadedSize-已上传字节数
  //totalSize-文件总字节数
  onFileProgressCallBack(loadedSize, totalSize) {
    return (loadedSize / totalSize) * 100;
  }

  //上传文件
  uploadFile(uploadFiles) {
    let file = uploadFiles.files[0];
    //先检查图片类型和大小
    if (!this.checkFile(file)) {
      return;
    }
    let businessType;//业务类型，1-发群文件，2-向好友发文件
    if (this.selType == webim.SESSION_TYPE.C2C) {//向好友发文件
      businessType = webim.UPLOAD_PIC_BUSSINESS_TYPE.C2C_MSG;
    } else if (this.selType == webim.SESSION_TYPE.GROUP) {//发群文件
      businessType = webim.UPLOAD_PIC_BUSSINESS_TYPE.GROUP_MSG;
    }

    //封装上传文件请求
    let opt = {
      'file': file, //文件对象
      'onProgressCallBack': this.onFileProgressCallBack, //上传文件进度条回调函数
      //'abortButton': document.getElementById('upd_abort'), //停止上传文件按钮
      'To_Account': this.selToID, //接收者
      'businessType': businessType,//业务类型
      'fileType': webim.UPLOAD_RES_TYPE.FILE//表示上传文件
    };
    //上传文件
    webim.uploadFile(opt,
      (resp) => {
        //上传成功发送文件
        this.sendFile(resp, file.name);
      },
      (err) => {
        this.popoversServ.presentToast(err.ErrorInfo);
      }
    );
  }

  //发送文件消息
  sendFile(file, fileName) {
    if (!this.selToID) {
      this.popoversServ.presentToast("您还没有好友，暂不能聊天");
      return;
    }

    let selSess = new webim.Session(this.selType, this.selToID, this.selToID, this.friendHeadUrl, Math.round(new Date().getTime() / 1000));
    let msg = new webim.Msg(selSess, true, -1, -1, -1, this.loginInfo.identifier, 0, this.loginInfo.identifierNick);
    let uuid = file.File_UUID;//文件UUID
    let fileSize = file.File_Size;//文件大小
    let senderId = this.loginInfo.identifier;
    let downloadFlag = file.Download_Flag;
    if (!fileName) {
      let random = Math.round(Math.random() * 4294967296);
      fileName = random.toString();
    }
    let fileObj = new webim.Msg.Elem.File(uuid, fileName, fileSize, senderId, this.selToID, downloadFlag, this.selType);
    msg.addFile(fileObj);
    //调用发送文件消息接口
    webim.sendMsg(msg, (resp) => {
      if (this.selType == webim.SESSION_TYPE.C2C) {//私聊时，在聊天窗口手动添加一条发的消息，群聊时，长轮询接口会返回自己发的消息
        this.addMsg(msg, false);
      }
    }, (err) => {
      this.popoversServ.presentToast(err.ErrorInfo);
    });
  }



  //检查文件类型和大小
  checkFile(file) {
    //let legalExts = 'jpg|jpeg|png|bmp|gif|webp|txt|doc|docx|xls|ppt|zip|rar|gz';
    //let ext = obj.value.substr(obj.value.lastIndexOf(".") + 1).toLowerCase();//获得文件后缀名
    //let pos = legalExts.indexOf(ext);
    //if (pos < 0) {
    //    this.popoversServ.presentToast("您选中的文件类型非法，请重新选择");
    //    return false;
    //}
    let fileSize = Math.round(file.size / 1024 * 100) / 100; //单位为KB
    if (fileSize > 20 * 1024) {
      this.popoversServ.presentToast("您选择的文件大小超过限制(最大为20M)，请重新选择");
      return false;
    }
    return true;
  }
}

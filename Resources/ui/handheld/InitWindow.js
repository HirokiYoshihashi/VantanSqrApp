function InitWindow(title) {
	var self = Ti.UI.createWindow({
		title:title,
    layout:'vertical',
		backgroundColor:'white'
	});

  
  //var button = Ti.UI.createButton({title:'close', width:Ti.UI.Size, height:Ti.UI.Size});
  //button.addEventListener('click', function(){self.close();});
  //self.add(button);

  var label = Ti.UI.createLabel({
    top:10,
    left:10,
    right:10,
    height:Ti.UI.Size,
    text: "世界最高のパクリアプリ『5Square』をご利用いただきありがとうございます！このアプリを利用するにはユーザー登録が必要です。登録された情報は２ちゃんねるに勝手に書き込んだり第三者に金のために売り渡したりはしません（今のところ）。ユーザー名は半角英数字で４文字以上、１５文字以内で登録してください。"
  });
  self.add(label);

  var textField = Ti.UI.createTextField({
    hintText:'ユーザー名を登録してね（半角英数字）',
    borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
    color: '#336699',
    top: 10, left: 10,
    width: 250, height: 60
  });

  textField.addEventListener('return', function(e){
    var username = e.value;

    if(Ti.Network.online){
      var url = "http://vantan.tidevs.in/users";
      var http = Ti.Network.createHTTPClient({timeout:10000});
      http.onload = function(){
        Ti.API.info(http.responseText);
        Ti.App.Properties.setString('username', username);
        self.close();
      };
      http.onerror = function(e){alert("エラー！")};
      http.open('POST', url);
      http.send({"user[username]":username});
    }else{
      alert("ごめんね、ネットワークが繋がってないみたい。調べてみて！");
    }
  });
	
  self.add(textField);
	
	return self;
};

module.exports = InitWindow;
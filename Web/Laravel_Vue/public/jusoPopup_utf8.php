<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>fitfood address</title>
<?php
   $ADDR['inputYn'] = $_POST['inputYn'];
   $ADDR['roadAddrPart1'] = $_POST['roadAddrPart1'];
   $ADDR['addrDetail'] = $_POST['addrDetail'];
   $ADDR['zipNo'] = $_POST['zipNo'];
?>
</head>
<script>
function init(){
   var url = location.href;
   // var url = 'http://localhost:8000/';
   var confmKey = "devU01TX0FVVEgyMDIwMDYwODIzMjAxMjEwOTg0NTg=";
   var resultType = "2"; // 도로명주소 검색결과 화면 출력유형, 1 : 도로명, 2 : 도로명+지번
   // php.ini 에 short_open_tag 가 On 으로 설정되어 되어 있는 경우 아래 소스 코드 사용
   var inputYn= "<?=$ADDR['inputYn']?>";
   // php.ini 에 short_open_tag 가 Off 으로 설정되어 되어 있는 경우 아래 소스 코드 사용
   if(inputYn != "Y"){
      document.form.confmKey.value = confmKey;
      document.form.returnUrl.value = url;
      document.form.resultType.value = resultType;
      document.form.action="http://www.juso.go.kr/addrlink/addrLinkUrl.do"; //인터넷망
      document.form.submit();
      }else{
         jusoCallBack('<?=$ADDR['roadAddrPart1']?>','<?=$ADDR['addrDetail']?>','<?= $ADDR['zipNo']?>');
         window.close();
      }
   }
   function jusoCallBack(roadAddrPart1,addrDetail,zipNo){
         opener.document.getElementById('roadAddrPart1').value = roadAddrPart1;
         opener.document.getElementById('addrDetail').value = addrDetail;
         opener.document.getElementById('zipNo').value = zipNo;
    }
   window.onload=init;
</script>
<body>
   <form id="form" name="form" method="post"> 
      <input type="hidden" id="confmKey" name="confmKey" value=""/>
      <input type="hidden" id="returnUrl" name="returnUrl" value=""/>
      <input type="hidden" id="resultType" name="resultType" value=""/>
      <!-- 해당시스템의 인코딩타입이 EUC-KR일경우에만 추가 START-->
      <!-- <input type="hidden" id="encodingType" name="encodingType" value="EUC-KR"/> -->
      <!-- 해당시스템의 인코딩타입이 EUC-KR일경우에만 추가 END-->
   </form>
</body>
</html>
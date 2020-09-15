function empty(element_name,element_prompt)
{
  if (empty_field(element_name))
  {
    alert("{%(1)Value} \""+element_prompt+"\" {%(2)required}");
    return true;
  }
  return false;
}
function date_empty(element_name,element_prompt)
{
  if (empty(element_name,element_prompt))
    return true;
  if (!date_validate(element_name,element_prompt))
    return true;
  return false;
}
function empty_field(element_name)
{
  element = document.forms[0].elements[element_name];
  if (element==null)
  {
    alert("{%(3)Undefined element} "+element_name);
    return false;
  }
  if (element.type=="select-one")
  {
    if (element.selectedIndex>0)
      return false;
    else
      return true;
  }
  else
  {
    value = String(element.value);
    for (i=0; i<value.length; i++)
    {
      if (value.charAt(i)!=' ')
        return false;
    }
    return true;
  }
}
function clear_field(element_name)
{
  element = document.forms[0].elements[element_name];
  if (element==null)
  {
    alert("{%(3)Undefined element} "+element_name);
    return false;
  }
  if (element.type=="select-one")
    element.option.selected = 0;
  else
    element.value = '';
}
function date_validate(element_name,element_prompt)
{
  element = document.forms[0].elements[element_name];
  if (element==null)
    return true;
  value = String(element.value);
  if (!check_date(value))
  {
    alert(element_prompt+"\n"+value+" {%(4)is not a valid date}\n{%(5)please note: date format is} {DATE_FORMAT}");
    document.forms[0].elements[element_name].focus();
    return false;
  }
  return true;
}
function date_changed(element_name)
{
  value = String(document.forms[0].elements[element_name].value);
  if (!check_date(value))
  {
    alert(value+" {%(4)is not a valid date}\n{%(5)please note: date format is} {DATE_FORMAT}");
    document.forms[0].elements[element_name].focus();
    return false;
  }
  else
  {
    document.forms[0].elements[element_name].value = format_date(value);
    return true;
  }
}
function date_changed_submit(element_name)
{
  if (date_changed(element_name))
  {
    document.forms[0].submit();
    return true;
  }
  else
    return false;
}
function float_validate(element_name,element_prompt)
{
  element = document.forms[0].elements[element_name];
  if (element==null)
    return true;
  value = String(element.value);
  if (!check_float(value))
  {
    alert(element_prompt+"\n{%(6)Wrong float value}: "+value+" {%(7)correct format is} 000{DECIMAL_SIGN}00");
    return false;
  }
  return true;
}
function leap(y)
{
  return (y%4==0) && (y%100!=0 || y%400==0);
}
function days(m,y)
{
  if (m==4 || m==6 || m==9 || m==11)
    return 30;
  if (m==2)
  {
    if (leap(y))
      return 29;
    else
      return 28;
  }
  return 31;
}
function check_date(value)
{
  while (value.length>0)
  {
    if (value.charAt(0)==' ')
      value = value.substring(1,value.length-1);
    else
      break;
  }
  if (value.length==0)
    return true;
  date_format = String("{DATE_FRMT}");
  value += ' ';
  s = String("");
  year = 0;
  month = 0;
  day = 0;
  pos = 0;
  for (i=0; i<value.length; i++)
  {
    ch = value.charAt(i);
    if (ch=='.' || ch=='-' || ch=='/' || ch==' ')
    {
      if (date_format.charAt(pos)=='D')
      {
        day = parseInt(s,10);
        if (isNaN(day))
          day = 0;
      }
      if (date_format.charAt(pos)=='M')
      {
        month = parseInt(s,10);
        if (isNaN(month))
          month = 0;
      }
      if (date_format.charAt(pos)=='Y')
      {
        year = parseInt(s,10);
        if (isNaN(year))
          year = 0;
      }
      pos++;
      if (pos>2)
        break;
      s = "";
    }
    else
      s += ch;
  }
  if (year<=0 || month<=0 || day<=0) 
    return false;
  if (month>12)
    return false;
  if (year<100)
  {
    if (year<40)
      year += 2000;
    else
      year += 1900;
  }
  if (year>9999)
    return false;
  if (day>days(month,year))
    return false;
  return true;
}
function format_date(value)
{
  while (value.length>0)
  {
    if (value.charAt(0)==' ')
      value = value.substring(1,value.length-1);
    else
      break;
  }
  if (value.length==0)
    return value;
  date_format = String("{DATE_FRMT}");
  value += ' ';
  s = String("");
  year = 0;
  month = 0;
  day = 0;
  pos = 0;
  for (i=0; i<value.length; i++)
  {
    ch = value.charAt(i);
    if (ch=='.' || ch=='-' || ch=='/' || ch==' ')
    {
      if (date_format.charAt(pos)=='D')
      {
        day = parseInt(s,10);
        if (isNaN(day))
          day = 0;
      }
      if (date_format.charAt(pos)=='M')
      {
        month = parseInt(s,10);
        if (isNaN(month))
          month = 0;
      }
      if (date_format.charAt(pos)=='Y')
      {
        year = parseInt(s,10);
        if (isNaN(year))
          year = 0;
      }
      pos++;
      if (pos>2)
        break;
      s = "";
    }
    else
    {
      s += ch;
    }
  }
  if (year<100)
  {
    if (year<40)
      year += 2000;
    else
      year += 1900;
  }
  day = String(day);
  month = String(month);
  year = String(year);
  while (day.length<2)
    day = "0"+day;
  while (month.length<2)
    month = "0"+month;
  result = String("");
  for (i=0; i<3; i++)
  {
    if (date_format.charAt(i)=='D')
      result += day;
    if (date_format.charAt(i)=='M')
      result += month;
    if (date_format.charAt(i)=='Y')
      result += year;
    if (i<2)
      result += date_format.charAt(3);
  }
  return result;
}
function float_changed(element_name,decimals)
{
  gr_sign = '{GROUPING_SIGN}';
  mesg = "";
  for (i=0; i<decimals; i++)
  {
    if (i==0)
      mesg+= "{DECIMAL_SIGN}";
    mesg += "0";
  }
  s = String(document.forms[0].elements[element_name].value);

  value = "";
  for (i=0; i<s.length; i++)
  {
    if (s.charAt(i)!=' ' && s.charAt(i)!=gr_sign)
     value = value+s.charAt(i);
  }

  if (value.length>0)
  {
    if (!check_float(value))
    {
      alert("{%(6)Wrong float value}: "+value+" {%(7)correct format is} 000"+mesg);
      return false;
    }
    else
    {
      document.forms[0].elements[element_name].value = format_float(value,decimals);
      return true;
    }  
  }
  else
  {
    document.forms[0].elements[element_name].value = "";
    return true;
  }
}
function float_changed_submit(element_name,decimals)
{
  if (float_changed(element_name,decimals))
  {
    document.forms[0].submit();
    return true;
  }
  else
    return false;
}
function check_float(value)
{
  if (value.length==0)
    return true;
  v = parse_float(value);
  if (v.length==0)
    return false;
  else
    return true;
}
function format_float(value,decimals)
{

  sign = '{DECIMAL_SIGN}';
  gr_sign = '{GROUPING_SIGN}';
  v = value;
  is_negative = (value<0);
  if (decimals>=0)
  {
    for (i=0; i<decimals; i++)
      v = v*10;
    v = Math.round(v);
    s = ""+v;
    if (is_negative)
      s = s.substr(1,s.length-1);
    if (decimals>0)
    {
      while (s.length<3)
        s = "0"+s;
      while (s.length<decimals+1)
        s = "0"+s;
      result = sign+s.substr(s.length-decimals,s.length);
      s = s.substr(0,s.length-decimals);
    }
    else
      result = "";  
    n = 0;
    for (i=s.length-1; i>=0; i--)
    {
      if (n==3)
      {
        result = gr_sign+result;
        n = 0;
      }
      result = s.charAt(i)+result;
      n++;
    }
    if (is_negative)
      result = '-'+result;
  }
  else
  {
    s = ""+v;
    result = "";
    for (i=0; i<value.length; i++)
    {
      ch = s.charAt(i);
      if (ch=='.')
        result += sign;
      else
        result += ch;
    }
  }
  return result;
}
function parse_float(value)
{
  sign = '{DECIMAL_SIGN}';
  intvalue = "";
  decvalue = "";
  change = false;
  for (i=0; i<value.length; i++)
  {
    ch = value.charAt(i);
    if (ch==sign)
    {
      ch = '.';
      change = true;
    }
    if ((ch>=1 && ch<=9) || ch=='0' || ch=='-' || ch=='+')
    {
      if (change)
        decvalue += ch;
      else
        intvalue += ch;
    }
  }
  dec_points = 1.0;
  for (i=0; i<decvalue.length; i++)
    dec_points = dec_points*10;
  if (decvalue=="" && intvalue=="")
    return "";
  if (decvalue=="")
    decvalue = "0";
  if (intvalue=="")
    intvalue = "0";
  is_negative = false;
  if (intvalue.length>1&&intvalue.charAt(0)=='-')
    is_negative = true;
  decimal = parseInt(decvalue,10)/dec_points;
  if (is_negative)
    return parseInt(intvalue,10)-decimal;
  else
    return parseInt(intvalue,10)+decimal;


}
function advance_field(length,limit,nextObject)
{
  if (length>=limit)
    nextObject.focus();
}
function CalculateMod(a, b)
{
  result = '';
  c = 0;
  e = 0;
  for (counter=0; counter<a.length; counter++)
  {
    c = ((c-e))*10+(a.substr(counter,1)*1);
    d = Math.floor(c/b);
    result += d;
    e = d*b
  }
  return (c-e);
}
function FRVerifyDetails(TestString)
{
  TestString = TestString.replace(/A/g,'1');
  TestString = TestString.replace(/B/g,'2');
  TestString = TestString.replace(/C/g,'3');
  TestString = TestString.replace(/D/g,'4');
  TestString = TestString.replace(/E/g,'5');
  TestString = TestString.replace(/F/g,'6');
  TestString = TestString.replace(/G/g,'7');
  TestString = TestString.replace(/H/g,'8');
  TestString = TestString.replace(/I/g,'9');
  TestString = TestString.replace(/J/g,'1');
  TestString = TestString.replace(/K/g,'2');
  TestString = TestString.replace(/L/g,'3');
  TestString = TestString.replace(/M/g,'4');
  TestString = TestString.replace(/N/g,'5');
  TestString = TestString.replace(/O/g,'6');
  TestString = TestString.replace(/P/g,'7');
  TestString = TestString.replace(/Q/g,'8');
  TestString = TestString.replace(/R/g,'9');
  TestString = TestString.replace(/S/g,'2');
  TestString = TestString.replace(/T/g,'3');
  TestString = TestString.replace(/U/g,'4');
  TestString = TestString.replace(/V/g,'5');
  TestString = TestString.replace(/W/g,'6');
  TestString = TestString.replace(/X/g,'7');
  TestString = TestString.replace(/Y/g,'8');
  TestString = TestString.replace(/Z/g,'9');
  if (CalculateMod(TestString,97))
    return false;
  else
    return true;
}
function checkbox_changed(element_name)
{
  checked = document.forms[0].elements[element_name].checked;
  if (checked)
    document.forms[0].elements[element_name+"_HIDDEN"].value = "Y";
  else
    document.forms[0].elements[element_name+"_HIDDEN"].value = "N";
}
function force_submit()
{
  document.forms[0].submit();
}
function checkbox_changed_submit(element_name)
{
  checkbox_changed(element_name);
  force_submit();
}
function integer_change(element_name)
{
  element = document.forms[0].elements[element_name];
  if (element==null)
    return true;
  value = String(element.value);
  for (i=0; i<value.length; i++)
  {
    ch = value.charAt(i);
    if ((ch<'0' || ch>'9') && (i!=0 || (i==0 && ch!='-')))
    {
      alert("{%(8)Wrong integer value}: "+value);
      return false;
    }
  }
  return true;
}
function integer_change_submit(element_name)
{
  if (integer_change(element_name))
  {
    document.forms[0].submit();
    return true;
  }
  else
    return false;
}
function delAttachment(e, input) {
	e.preventDefault();
	input.value = '';
    var event = new Event('change');
    input.dispatchEvent(event);
	return false;
}
var timeout;
function set_focus()
{
{FRAMES_NOT_ALLOWED}
  element = document.forms[0].elements["FOCUSED_FIELD"];
  if (element!=null)
  {
    field_name = element.value;
    element = document.forms[0].elements[field_name];
    if (element!=null)
    {
      element_type = ""+element.type;
      if (element_type!="undefined")
      {
        element.focus();
      }  
      else
      {
        if (!isNaN(element.length))
        {
          button_checked = -1;
          for (var i=0; i<element.length; i++)
          {
            if (element[i].checked)
              button_checked = i;
          }    
          if (button_checked>=0)            
            element[button_checked].focus();
          else
          {
            element[0].focus();
            element[0].checked = false;
          }
        }
      }
    }  
  } else {
	  var inputs = document.querySelectorAll('input, select, button');
	  for (var i = 0; i < inputs.length; i++) {
		  if (inputs[i].type!='undefined'&&inputs[i].type!='image') {
			  inputs[i].focus();
			  break;
		  }
	  }
  }
  var inputs = document.querySelectorAll('input[type="file"]');
  Array.prototype.forEach.call(inputs, function(input) {
    var label = input.nextElementSibling, labelVal = label.innerHTML;
    input.addEventListener('change', function(e) {
	  var fileName = e.target.value.split('\\').pop();
	  if (fileName) {
	    label.innerHTML = fileName + "<img class=\"delete\" src=\"{IMAGE_PATH}delete.png\" id=\"deleteButton\">";
	    document.getElementById('deleteButton').addEventListener('click', function(e) {
	    	delAttachment(e, input);
	    	});
	  }
	  else {
	    label.innerHTML = labelVal;
	  }
	});
  });
  var rows = document.querySelectorAll('.zubra tr');
  Array.prototype.forEach.call(rows, function(row) {
	var inputs = row.querySelectorAll('input, select, button');
	if (inputs.length==0) {
	    row.addEventListener('click', function(e) {
	        var link = row.querySelector('a');
	        if (link!=null&&getSelectionText()=="")
	      	  window.location = link.href;
	  	});
	}
  });
  var inputs = document.querySelectorAll('input[type="submit"]');
  Array.prototype.forEach.call(inputs, function(input) {
    input.addEventListener('click', function(e) {
    	if (form_being_submitted) {
    		e.preventDefault();
    		return false;
    	}
    	else {
    		form_being_submitted = true;
    		document.body.style.cursor = 'wait';
    		return true;
    	}
	});
  });
{TIME_TICKER_CALL}
}
function search_client_category(field_name,do_submit,category)
{
  path = "?screen_name=do_search_client&ReturnField="+field_name;
  if (do_submit)
    path += "&DoSubmit=1";
  path += "&Category="+category; 
  new_window = window.open(path,'LIFEfitClientSearch',"location=no,toolbar=no,status=no,menubar=no,hotkeys=no,resizable=yes,scrollbars=yes,width=600,height=400");
  new_window.focus();
}
function search_client(field_name,do_submit)
{
  path = "?screen_name=do_search_client&ReturnField="+field_name;
  if (do_submit)
    path += "&DoSubmit=1";
  new_window = window.open(path,'LIFEfitClientSearch',"location=no,toolbar=no,status=no,menubar=no,hotkeys=no,resizable=yes,scrollbars=yes,width=600,height=400");
  new_window.focus();
}
function search_member_import(field_name,group_code,member_no,member_name,birth_date,do_submit)
{
  path = "?screen_name=do_search_member_import&group_code="+group_code+"&member_no="+member_no+"&member_name="+encodeURIComponent(member_name)+"&birth_date="+encodeURIComponent(birth_date)+"&ReturnField="+field_name;
  if (do_submit)
    path += "&DoSubmit=1";
  new_window = window.open(path,'LIFEfitMemberImportSearch',"location=no,toolbar=no,status=no,menubar=no,hotkeys=no,resizable=yes,scrollbars=yes,width=600,height=400");
  new_window.focus();
}
function search_policy(field_name,do_submit)
{
  path = "?screen_name=do_search_policy&ReturnField="+field_name;
  if (do_submit)
    path += "&DoSubmit=1";
  new_window = window.open(path,'LIFEfitPolicySearch',"location=no,toolbar=no,status=no,menubar=no,hotkeys=no,resizable=yes,scrollbars=yes,width=600,height=400");
  new_window.focus();
}
function search_agent(field_name,do_submit)
{
  path = "?screen_name=do_search_agent&ReturnField="+field_name;
  if (do_submit)
    path += "&DoSubmit=1";
  new_window = window.open(path,'LIFEfitAgentSearch',"location=no,toolbar=no,status=no,menubar=no,hotkeys=no,resizable=yes,scrollbars=yes,width=600,height=400");
  new_window.focus();
}
function search_agent_hier(field_name,do_submit)
{
  path = "?screen_name=do_search_agent_hier&ReturnField="+field_name;
  if (do_submit)
    path += "&DoSubmit=1";
  new_window = window.open(path,'LIFEfitAgentSearch',"location=no,toolbar=no,status=no,menubar=no,hotkeys=no,resizable=yes,scrollbars=yes,width=600,height=400");
  new_window.focus();
}
function search_group(field_name,do_submit)
{
  path = "?screen_name=do_search_group&ReturnField="+field_name;
  if (do_submit)
    path += "&DoSubmit=1";
  new_window = window.open(path,'LIFEfitGroupSearch',"location=no,toolbar=no,status=no,menubar=no,hotkeys=no,resizable=yes,scrollbars=yes,width=600,height=400");
  new_window.focus();
}
function choose_unitdate(field_name)
{
  path = "?screen_name=do_choose_unitdate&ReturnField="+field_name;
  new_window = window.open(path,'LIFEfitUnitdate',"location=no,toolbar=no,status=no,menubar=no,hotkeys=no,resizable=yes,scrollbars=yes,width=600,height=400");
  new_window.focus();
}
function search_dict_list(field_name,dict_name)
{
  path = "?screen_name=do_search_dict_list&ReturnField="+field_name+"&DictName="+dict_name;
  new_window = window.open(path,'LIFEfitDict',"location=no,toolbar=no,status=no,menubar=no,hotkeys=no,resizable=yes,scrollbars=yes,width=600,height=400");
  new_window.focus();
}
function search_dict_list_mult(field_name,dict_name)
{
  items = "";
  fnl = field_name.length;
  for (i=0; i<document.forms[0].elements.length; i++)
  {
    s = document.forms[0].elements[i].name;
    if (s.substr(0,fnl)==field_name && s!=field_name+"NewValues")
    {
      if (document.forms[0].elements[i].value!="")
      {
        if (items!="")
          items += ",";
        items += document.forms[0].elements[i].value;
      }
    }
  } 
  path = "?screen_name=do_search_dict_list_mult&ReturnField="+field_name+"&DictName="+dict_name+"&Items="+items;
  new_window = window.open(path,'LIFEfitDictList',"location=no,toolbar=no,status=no,menubar=no,hotkeys=no,resizable=yes,scrollbars=yes,width=600,height=400");
  new_window.focus();
}
function select_fund_list(field_name,return_field_name,plan_code)
{
  items = document.forms[0].elements[field_name].value;
  path = "?screen_name=select_fund_list&ReturnField="+return_field_name+"&Items="+items+"&PlanCode="+plan_code;
  new_window = window.open(path,'LIFEfitFundList',"location=no,toolbar=no,status=no,menubar=no,hotkeys=no,resizable=yes,scrollbars=yes,width=600,height=400");
  new_window.focus();
}
function search_operator_list(field_name)
{
  path = "?screen_name=do_search_operator&ReturnField="+field_name;
  new_window = window.open(path,'LIFEfitOperatorList',"location=no,toolbar=no,status=no,menubar=no,hotkeys=no,resizable=yes,scrollbars=yes,width=600,height=400");
  new_window.focus();
}
function search_pseudo(field_name,pseudo_map)
{
  path = "?screen_name=do_search_pseudo&ReturnField="+field_name+"&PseudoMap="+pseudo_map;
  new_window = window.open(path,'LIFEfitPseudo',"location=no,toolbar=no,status=no,menubar=no,hotkeys=no,resizable=yes,scrollbars=yes,width=600,height=400");
  new_window.focus();
}
function search_sortcode(field_name)
{
  path = "?screen_name=do_search_sortcode&ReturnField="+field_name+"&DoSubmit=1";
  new_window = window.open(path,'LIFEfitSortcode',"location=no,toolbar=no,status=no,menubar=no,hotkeys=no,resizable=yes,scrollbars=yes,width=600,height=400");
  new_window.focus();
}
function process_bank(client_field,bank_field)
{
  path = "?screen_name=external_bank_account";
  cl_element = document.forms[0].elements[client_field];
  if (cl_element!=null && cl_element.value)
    path += "&ClientKey="+cl_element.value;
  element = document.forms[0].elements[bank_field];
  if (element!=null && element.value && cl_element!=null && cl_element.value)
    path += "&BankKey="+cl_element.value+"*"+element.value;
  path += "&ReturnTo=external_screen";
  new_window = window.open(path,'LIFEfitBank',"location=no,toolbar=no,status=no,menubar=no,hotkeys=no,resizable=yes,scrollbars=yes,width=600,height=500");
  new_window.focus();
}
function create_bank(client_field,source)
{
  path = "?screen_name=create_bank_account";
  cl_element = document.forms[0].elements[client_field];
  if (cl_element!=null && cl_element.value)
    path += "&ClientKey="+cl_element.value;
  path+= "&Source="+source;
  path += "&ReturnTo=external_screen";
  new_window = window.open(path,'LIFEfitCreateBank',"location=no,toolbar=no,status=no,menubar=no,hotkeys=no,resizable=yes,scrollbars=yes,width=600,height=500");
  new_window.focus();
}
function lookup_address(field_names)
{
  path = "?screen_name=do_address_lookup&ReturnFields="+field_names;
  new_window = window.open(path,'LIFEfitAddressLookup',"location=no,toolbar=no,status=no,menubar=no,hotkeys=no,resizable=yes,scrollbars=yes,width=600,height=500");
  new_window.focus();
}
function search_merge_name(tp_field,value_field)
{
  tp_value = document.forms[0].elements[tp_field];
  if (tp_value!=null && tp_value.value.length>0)
  {
    path = "?screen_name=do_search_merge&MergeType="+tp_value.value+"&ReturnField="+value_field;
    new_window = window.open(path,'LIFEfitMergeName',"location=no,toolbar=no,status=no,menubar=no,hotkeys=no,resizable=yes,scrollbars=yes,width=600,height=400");
    new_window.focus();
  }  
}
function confirm_nb_exit()
{
  answer = confirm("{%(9)Warning - data will not be saved! Are you sure?}");
  if (answer)
  {
    scr_element = document.forms[0].elements["SCREEN_NAME"];
    if (scr_element!=null && scr_element.value)
      scr_element.value = "DO_NEW_BUSINESS";
  }
}
var datePickerDivID = "datepicker";
var date_format = "{DATE_FRMT}";
function displayDatePicker(dateFieldName, displayBelowThisObject)
{
  var targetDateField = document.getElementsByName(dateFieldName).item(0);
  if (!displayBelowThisObject)
    displayBelowThisObject = targetDateField;
  var x = displayBelowThisObject.offsetLeft;
  var y = displayBelowThisObject.offsetTop+displayBelowThisObject.offsetHeight;
  var parent = displayBelowThisObject;
  while (parent.offsetParent) 
  {
    parent = parent.offsetParent;
    x += parent.offsetLeft;
    y += parent.offsetTop;
  }
  drawDatePicker(targetDateField,x,y);
}
function drawDatePicker(targetDateField, x, y)
{
  var dt = getFieldDate(targetDateField.value);
  if (!document.getElementById(datePickerDivID)) 
  {
    var newNode = document.createElement("div");
    newNode.setAttribute("id",datePickerDivID);
    newNode.setAttribute("class","dpDiv");
    newNode.setAttribute("style","visibility: hidden;");
    document.body.appendChild(newNode);
  }
  var pickerDiv = document.getElementById(datePickerDivID);
  pickerDiv.style.position = "absolute";
  pickerDiv.style.left = x+"px";
  pickerDiv.style.top = y+"px";
  pickerDiv.style.visibility = (pickerDiv.style.visibility=="visible" ? "hidden" : "visible");
  pickerDiv.style.display = (pickerDiv.style.display=="block" ? "none" : "block");
  pickerDiv.style.zIndex = 10000;
  refreshDatePicker(targetDateField.name,dt.getFullYear(),dt.getMonth(),dt.getDate());
}
function refreshDatePicker(dateFieldName, year, month, day)
{
  var thisDay = new Date();
  if (month>=0 && year>0) 
  {
    thisDay = new Date(year,month,1);
  } 
  else 
  {
    day = thisDay.getDate();
    thisDay.setDate(1);
  }
  var crlf = "\r\n";
  var TABLE = "<table cols=7 class='dpTable'>"+crlf;
  var xTABLE = "</table>"+crlf;
  var TR = "<tr class='dpTR'>";
  var TR_title = "<tr class='dpTitleTR'>";
  var TR_days = "<tr class='dpDayTR'>";
  var TR_todaybutton = "<tr class='dpTodayButtonTR'>";
  var xTR = "</tr>"+crlf;
  var TD = "<td class='dpTD' onMouseOut='this.className=\"dpTD\";' onMouseOver=' this.className=\"dpTDHover\";' ";
  var TD_title = "<td colspan=5 class='dpTitleTD'>";
  var TD_buttons = "<td class='dpButtonTD'>";
  var TD_todaybutton = "<td colspan=7 class='dpTodayButtonTD'>";
  var TD_days = "<td class='dpDayTD'>";
  var TD_selected = "<td class='dpDayHighlightTD' onMouseOut='this.className=\"dpDayHighlightTD\";' onMouseOver='this.className=\"dpTDHover\";' ";
  var xTD = "</td>"+crlf;
  var DIV_title = "<div class='dpTitleText'>";
  var DIV_selected = "<div class='dpDayHighlight'>";
  var xDIV = "</div>";
  var html = TABLE;
  var month_list = new Array({MONTH_LIST});
  html += TR_title;
  html += TD_buttons+getButtonCode(dateFieldName,thisDay,-1,"&lt;")+xTD;
  html += TD_title+DIV_title+month_list[thisDay.getMonth()]+" "+thisDay.getFullYear()+xDIV+xTD;
  html += TD_buttons+getButtonCode(dateFieldName,thisDay,1,"&gt;")+xTD;
// html += TD_buttons+"<button class='dpButton'
// onClick='updateDateField(\""+dateFieldName+"\");'>X</button>"+xTD;
  html += xTR;
  html += TR_days;
  empty_days_html = "";
  first_week_day = {WEEK_START_DAY};
  day_of_week = thisDay.getDay()-first_week_day;
  if (day_of_week<0)
    day_of_week += 7;
  week_day_list = new Array({WEEK_DAY_LIST});
  for (i=0; i<7; i++)
  {
    index = i+first_week_day;
    if (index>6)
      index -= 7;
    html += TD_days+week_day_list[index]+xTD;
    if (i<day_of_week)
      empty_days_html += TD+"&nbsp;"+xTD;
  }  
  html += xTR;
  if (empty_days_html!="")
  {
    html += TR;
    html += empty_days_html;
  }  
  do 
  {
    dayNum = thisDay.getDate();
    day_of_week = thisDay.getDay()-first_week_day;
    if (day_of_week<0)
      day_of_week += 7;
    if (day_of_week==0)
      html += TR;
    TD_onclick = " onclick=\"updateDateField('"+dateFieldName+"', '"+getDateString(thisDay)+"');\">";
    if (dayNum==day)
      html += TD_selected+TD_onclick+DIV_selected+dayNum+xDIV+xTD;
    else
      html += TD+TD_onclick+dayNum+xTD;
    if (day_of_week==6)
      html += xTR;
    thisDay.setDate(thisDay.getDate()+1);
  } while (thisDay.getDate()>1);
  if (day_of_week<6) 
  {
    for (i=day_of_week; i<6; i++)
      html += TD+"&nbsp;"+xTD;
  }
  html += xTR;
  var today = new Date();
  html += TR_todaybutton+TD_todaybutton;
  html += "<button class='dpTodayButton' onClick='refreshDatePicker(\""+dateFieldName+"\");'>Today</button> ";
  html += "<button class='dpTodayButton' onClick='updateDateField(\""+dateFieldName+"\");'>Close</button>";
  html += xTD+xTR;
  html += xTABLE;
  document.getElementById(datePickerDivID).innerHTML = html;
  adjustiFrame();
}
function getButtonCode(dateFieldName, dateVal, adjust, label)
{
  var newMonth = (dateVal.getMonth()+adjust)%12;
  var newYear = dateVal.getFullYear()+parseInt((dateVal.getMonth()+adjust)/12);
  if (newMonth<0) 
  {
    newMonth += 12;
    newYear += -1;
  }
  return "<button class='dpButton' onClick='refreshDatePicker(\""+dateFieldName+"\", "+newYear+", "+newMonth+");'>"+label+"</button>";
}
function getDateString(dateVal)
{
  var dayString = "00"+dateVal.getDate();
  var monthString = "00"+(dateVal.getMonth()+1);
  result = "";
  for (i=0; i<3; i++)
  {
    if (i>0)
      result += date_format.charAt(3);
    ch = date_format.charAt(i);
    switch (ch)
    {
      case 'D':
        result += dayString.substring(dayString.length-2);
        break;
      case 'M':
        result += monthString.substring(monthString.length-2);
        break;
      case 'Y':
        result += dateVal.getFullYear();
        break;
      default:
        result += "X";  
    }      
  }  
  return result;
}
function getFieldDate(dateString)
{
  var dateVal;
  try 
  {
    var dArray = splitDateString(dateString);
    if (dArray) 
    {
      var d = 0;
      var m = 0;
      var y = 0;
      for (i=0; i<3; i++)
      {
        ch = date_format.charAt(i);
        if (ch=='D')
          d = parseInt(dArray[i],10);
        else if (ch=='M')    
          m = parseInt(dArray[i],10)-1;
        else if (ch=='Y')  
          y = parseInt(dArray[i],10);
      }  
      dateVal = new Date(y,m,d);
    } 
    else if (dateString) 
      dateVal = new Date(dateString);
    else 
      dateVal = new Date();
  } 
  catch(e)
  {
    dateVal = new Date();
  }
  return dateVal;
}
function splitDateString(dateString)
{
  var dArray;
  if (dateString.indexOf("/")>=0)
    dArray = dateString.split("/");
  else if (dateString.indexOf(".")>=0)
    dArray = dateString.split(".");
  else if (dateString.indexOf("-")>=0)
    dArray = dateString.split("-");
  else if (dateString.indexOf("\\")>=0)
    dArray = dateString.split("\\");
  else
    dArray = false;
  return dArray;
}
function updateDateField(dateFieldName, dateString)
{
  var targetDateField = document.getElementsByName(dateFieldName).item(0);
  if (dateString)
    targetDateField.value = dateString;
  var pickerDiv = document.getElementById(datePickerDivID);
  pickerDiv.style.visibility = "hidden";
  pickerDiv.style.display = "none";
  adjustiFrame();
  targetDateField.focus();
}
function adjustiFrame(pickerDiv, iFrameDiv)
{
  var is_opera = (navigator.userAgent.toLowerCase().indexOf("opera")!=-1);
  if (is_opera)
    return;
  var iFrameDivID = "datepickeriframe";
  try 
  {
    if (!document.getElementById(iFrameDivID)) 
    {
      var newNode = document.createElement("iFrame");
      newNode.setAttribute("id",iFrameDivID);
      newNode.setAttribute("src","javascript:false;");
      newNode.setAttribute("scrolling","no");
      newNode.setAttribute ("frameborder","0");
      document.body.appendChild(newNode);
    }
    if (!pickerDiv)
      pickerDiv = document.getElementById(datePickerDivID);
    if (!iFrameDiv)
      iFrameDiv = document.getElementById(iFrameDivID);
    try 
    {
      iFrameDiv.style.position = "absolute";
      iFrameDiv.style.width = pickerDiv.offsetWidth;
      iFrameDiv.style.height = pickerDiv.offsetHeight ;
      iFrameDiv.style.top = pickerDiv.style.top;
      iFrameDiv.style.left = pickerDiv.style.left;
      iFrameDiv.style.zIndex = pickerDiv.style.zIndex-1;
      iFrameDiv.style.visibility = pickerDiv.style.visibility ;
      iFrameDiv.style.display = pickerDiv.style.display;
    } 
    catch(e) 
    {
    }
  } 
  catch (ee) 
  {
  }
}
function timeTicker()
{
  url = "?screen_name=TIME_TICKER";
  if (window.XMLHttpRequest)
    request = new XMLHttpRequest();
  else if (window.ActiveXObject)
    request = new ActiveXObject("Microsoft.XMLHTTP");
  else
    return;  
  try
  {
    request.open("GET",url,false);
    request.send(null);
    value = request.responseText;
    if (value=="OK")
    {
      {TIME_TICKER_CALL}
    }  
  }
  catch (err)
  {
    alert("{%(10)Connection to the server lost}");  
  }  
}
function quickTest()
{
  url = "?screen_name=QUICK";
  if (window.XMLHttpRequest)
    request = new XMLHttpRequest();
  else if (window.ActiveXObject)
    request = new ActiveXObject("Microsoft.XMLHTTP");
  else
    return;  
  try
  {
    request.open("GET",url,false);
    request.send(null);
    value = request.responseText;
    if (value=="OK")
      return;
  }
  catch (err)
  {
    alert("{%(10)Connection to the server lost}");  
  }
  window.location = "?screen_name=login";
}
function getFieldValue(field_name)
{
  element = document.forms[0].elements[field_name];
  if (element!=null)
    return element.value;
  else
    return "";
}
function setFieldValue(field_name,value)
{
  element = document.forms[0].elements[field_name];
  if (element!=null)
    return element.value = value;
}
function setCities(county_field,city_field)
{
  county = getFieldValue(county_field);
  if (county.length>0)
    value_list = getValueFromString("Cities",makeLifefitCoreRequest("County="+county,"@LIST_CITIES"));
  else
    value_list = "";
  setSelectList(city_field,value_list.split(';'));
}
function callLifefit(field_list)
{
  screen_name = "@"+getFieldValue("SCREEN_NAME");
  callLifefitCore(field_list,screen_name);
}
function makeLifefitCoreRequest(field_list,screen_name)
{
  if (window.XMLHttpRequest)
    request = new XMLHttpRequest();
  else if (window.ActiveXObject)
    request = new ActiveXObject("Microsoft.XMLHTTP");
  else  
    return null;
  url = "?screen_name="+screen_name;
  name = "";
  for (i=0; i<field_list.length; i++)
  {
    ch = field_list.charAt(i);
    if (ch==',')
    {
      if (name.length>0)
        url += "&"+name+"="+getFieldValue(name);
    }
    else
      name += ch;
  }
  if (name.length>0) {
  	if (name.indexOf("=")!=-1)
      url += "&"+name;
  	else
      url += "&"+name+"="+getFieldValue(name);
  }
  try
  {
    request.open("GET",url,false);
    request.send(null);
    value_list = request.responseText;
    return value_list;
  }
  catch (err)
  {
    return null;
  }
}  
function callLifefitCore(field_list,screen_name)
{
  value_list = makeLifefitCoreRequest(field_list,screen_name);
  if (value_list==null)
    return;
  value_started = false;
  name = "";
  value = "";
  for (i=0; i<value_list.length; i++)
  {
    ch = value_list.charAt(i);
    if (!value_started)
    {
      if (ch=='=')
      {
        if (name.length>0)
        {
          value_started = true;
          value = "";
        }  
      }
      else
        name += ch;
    }
    else
    {    
      if (ch=='&' && i<value_list.length && value_list.charAt(i+1)!='&')
      {
        setFieldValue(name,value);
        name = "";
        value_started = false;
      }
      else
        value += ch;
    }    
  }
  if (value_started)
    setFieldValue(name,value);
}
function getValueFromString(field_name,value_list)
{
  value_started = false;
  name = "";
  value = "";
  for (i=0; i<value_list.length; i++)
  {
    ch = value_list.charAt(i);
    if (!value_started)
    {
      if (ch=='=')
      {
        if (name.length>0)
        {
          value_started = true;
          value = "";
        }  
      }
      else
        name += ch;
    }
    else
    {    
      if (ch=='&' && i<value_list.length && value_list.charAt(i+1)!='&')
      {
        setFieldValue(name,value);
        name = "";
        value_started = false;
      }
      else
        value += ch;
    }    
  }
  if (value_started)
  {
    if (name==field_name)
      return value;
  }  
  return "";
}
function setSelectList(field_name,value_list)
{
  element = document.forms[0].elements[field_name];
  if (element==null)
    return;
  element.options.length = 0;
  element.options[0] = new Option("","");
  for (var i = 0; i < value_list.length; i++)
    element.options[i+1] = new Option(value_list[i],value_list[i]);
}
function swap_values(field1_name,field2_name)
{
  field1 = document.forms[0].elements[field1_name];
  if (field1==null)
    return;
  field2 = document.forms[0].elements[field2_name];
  if (field2==null)
    return;
  tmp = field1.value;
  field1.value = field2.value;
  field2.value = tmp;  
}
function integer_change_call(element_name,field_list,screen_name)
{
  if (integer_change(element_name))
  {
    callLifefitCore(field_list,screen_name);
    return true;
  }
  else
    return false;
}
function float_change_call(element_name,field_list,screen_name)
{
  if (float_change(element_name))
  {
    callLifefitCore(field_list,screen_name);
    return true;
  }
  else
    return false;
}
function time_changed(element_name)
{
  value = String(document.forms[0].elements[element_name].value);
  if (value.length>0)
  {
    if (!check_time(value))
    {
      alert(value+" {%(11)is not a valid time}\n{%(12)please note: time format is hh:mm:ss}");
      document.forms[0].elements[element_name].focus();
      return false;
    }
    else
    {
      document.forms[0].elements[element_name].value = format_time(value);
      return true;
    }
  }  
}
function check_time(value)
{
  while (value.length>0)
  {
    if (value.charAt(0)==' ')
      value = value.substring(1,value.length-1);
    else
      break;
  }
  if (value.length==0)
    return true;
  value += ' ';
  s = String("");
  hours = -1;
  minutes = -1;
  seconds = 0;
  pos = 0;
  for (i=0; i<value.length; i++)
  {
    ch = value.charAt(i);
    if (ch==':' || ch==' ')
    {
      if (pos==0)
      {
        hours = parseInt(s,10);
        if (isNaN(hours))
          hours = -1;
      }
      if (pos==1)
      {
        minutes = parseInt(s,10);
        if (isNaN(minutes))
          minutes = -1;
      }
      if (pos==2)
      {
        seconds = parseInt(s,10);
        if (isNaN(seconds))
          seconds = -1;
      }      
      pos++;
      if (pos>2)
        break;
      s = "";
    }
    else
      s += ch;
  }
  if (hours<0 || minutes<0 || seconds<0) 
    return false;
  if (hours>23 || minutes>59 ||seconds>59)
    return false;
  return true;
}
function format_time(value)
{
  while (value.length>0)
  {
    if (value.charAt(0)==' ')
      value = value.substring(1,value.length-1);
    else
      break;
  }
  if (value.length==0)
    return true;
  value += ' ';
  s = String("");
  hours = -1;
  minutes = -1;
  seconds = 0;
  pos = 0;
  for (i=0; i<value.length; i++)
  {
    ch = value.charAt(i);
    if (ch==':' || ch=='h' || ch=='H' || ch==' ')
    {
      if (pos==0)
      {
        hours = parseInt(s,10);
        if (isNaN(hours))
          hours = -1;
      }
      if (pos==1)
      {
        minutes = parseInt(s,10);
        if (isNaN(minutes))
          minutes = -1;
      }
      if (pos==2)
      {
        seconds = parseInt(s,10);
        if (isNaN(seconds))
          seconds = -1;
      }      
      pos++;
      if (pos>2)
        break;
      s = "";
    }
    else
      s += ch;
  }
  hours = String(hours);
  minutes = String(minutes);
  seconds = String(seconds);
  while (minutes.length<2)
    minutes = "0"+minutes;
  while (seconds.length<2)
    seconds = "0"+seconds;
  result = hours+":"+minutes+":"+seconds;
  return result;  
}
function toggleEnabled(element){
  document.getElementsByName('PERCENTAGE_0')[0].readOnly  = input.checked;
  document.getElementsByName('PAYMENT_TYPE_0')[0].readOnly  = input.checked;
  document.getElementsByName('PAYMENT_TYPE_0')[0].readOnly  = input.checked;
  document.getElementsByName('PAYOUT_CURRENCY_0')[0].readOnly  = input.checked;
  document.getElementsByName('PAYEE_0')[0].readOnly  = input.checked;
  document.getElementsByName('SearchPayorButton_0')[0].readOnly  = input.checked;
  document.getElementsByName('AdditionalInstructions')[0].readOnly  = input.checked;
  document.getElementsByName('PSEUDO_0')[0].readOnly  = input.checked;
  document.getElementsByName('AMOUNT_0')[0].readOnly  = input.checked;
  document.getElementsByName('AddButton')[0].readOnly  = input.checked;
  document.getElementsByName('CHARGE_AMOUNT_0')[0].readOnly  = input.checked;
  document.getElementsByName('PAYEE_NAME_0')[0].readOnly  = input.checked;
  document.getElementsByName('BANK_NO_0')[0].readOnly  = input.checked;
}
function addFingerprint() {
	if (typeof Fingerprint2 == 'undefined')
		return;
    Fingerprint2.get(function (components) {
    	const values = components.map(component => component.value);
    	var fingerprint = String(Fingerprint2.x64hash128(values.join(''), 31));
    	var input = document.createElement("input");
    	input.setAttribute("type", "hidden");
    	input.setAttribute("name", "fingerprint");
    	input.setAttribute("value", fingerprint);
    	document.forms[0].appendChild(input);
    })
}
function getSelectionText() {
    var text = "";
    if (window.getSelection) {
        text = window.getSelection().toString();
    } else if (document.selection && document.selection.type != "Control") {
        text = document.selection.createRange().text;
    }
    return text;
}
var form_being_submitted = false;
window.onload = set_focus;
if (window.requestIdleCallback)
    requestIdleCallback(addFingerprint);
else
    setTimeout(addFingerprint, 500);

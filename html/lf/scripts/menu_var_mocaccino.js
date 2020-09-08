var darker = '#5b3900';
var lighter = '#d7bd84';	

/***********************************************************************************
* (c) Ger Versluis 2000 version 5.41 24 December 2001           *
* For info write to menus@burmees.nl              *
* You may remove all comments for faster loading            *   
***********************************************************************************/
  var LowBgColor=lighter;     // Background color when mouse is not over
  var LowSubBgColor=lighter;      // Background color when mouse is not over on subs
  var HighBgColor=darker;      // Background color when mouse is over
  var HighSubBgColor=darker;     // Background color when mouse is over on subs
  var FontLowColor=darker;     // Font color when mouse is not over
  var FontSubLowColor=darker;      // Font color subs when mouse is not over
  var FontHighColor='#FFFFFF';      // Font color when mouse is over
  var FontSubHighColor='#FFFFFF';     // Font color subs when mouse is over
  var BorderColor=lighter;      // Border color
  var BorderSubColor=darker;     // Border color for subs
  var BorderWidth=0;        // Border width
  var BorderBtwnElmnts=1;     // Border between elements 1 or 0
  var FontFamily="verdana";  // Font family menu items
  var FontSize=16;       // Font size menu items
  var FontBold=1;       // Bold menu items 1 or 0
  var FontItalic=0;       // Italic menu items 1 or 0
  var MenuTextCentered='left';      // Item text position 'left', 'center' or 'right'
  var MenuCentered='left';      // Menu horizontal position 'left', 'center' or 'right'
  var MenuVerticalCentered='top';   // Menu vertical position 'top', 'middle','bottom' or static
  var ChildOverlap=0;        // horizontal overlap child/ parent
  var ChildVerticalOverlap=0;      // vertical overlap child/ parent
  var StartTop=83;       // Menu offset x coordinate
  var StartLeft=0;        // Menu offset y coordinate
  var VerCorrect=0;       // Multiple frames y correction
  var HorCorrect=0;       // Multiple frames x correction
  var LeftPaddng=12;       // Left padding
  var TopPaddng=3;        // Top padding
  var FirstLineHorizontal=1;      // SET TO 1 FOR HORIZONTAL MENU, 0 FOR VERTICAL
  var MenuFramesVertical=0;     // Frames in cols or rows 1 or 0
  var DissapearDelay=1000;      // delay before menu folds in
  var TakeOverBgColor=1;      // Menu frame takes over background color subitem frame
  var FirstLineFrame='self';      // Frame where first level appears
  var SecLineFrame='self';      // Frame where sub levels appear
  var DocTargetFrame='self';      // Frame where target documents appear
  var TargetLoc='';       // span id for relative positioning
  var HideTop=0;        // Hide first level when loading new document 1 or 0
  var MenuWrap=1;       // enables/ disables menu wrap 1 or 0
  var RightToLeft=0;        // enables/ disables right to left unfold 1 or 0
  var UnfoldsOnClick=1;     // Level 1 unfolds onclick/ onmouseover
  var WebMasterCheck=1;     // menu tree checking on or off 1 or 0
  var ShowArrow=1;        // Uses arrow gifs when 1
  var KeepHilite=1;       // Keep selected path highligthed
  var Arrws=['/lf/images/right.png',16,16,'/lf/images/down.png',16,16,'/lf/images/trileft.gif',5,10]; // Arrow source, width and height
  var Sep=['/lf/images/separator.gif',16,16];

  var fit_menu_height = 20;
  var fit_menu_width_1 = 180;
  var fit_menu_width_2 = 240;
  var fit_menu_width_3 = 240;
  var fit_menu_width_4 = 240;

function BeforeStart(){}
function AfterBuild(){}
function BeforeFirstOpen(){}
function AfterCloseAll(){}



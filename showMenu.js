#pragma strict
private var flag;


function Start () {
flag=false;
Debug.Log(Screen.width);
Debug.Log(Screen.height);
}

function OnMouseDown(){
flag=true;


}
function OnGUI(){
	if (flag) {

		GUI.Box(new Rect(20,20,200,200),"标题");
		GUILayout.BeginArea(new Rect(40,40,160,120));
		GUILayout.Label('uzopopopopo');
		GUILayout.Label('3qma');
		GUILayout.Label('333');
		GUILayout.Label('44');
		GUILayout.EndArea();
		if (GUI.Button (Rect (40,160,160,32), "OK")) {

			
			flag=false;

		};
		



	};

// Make a background box
    GUI.Box (Rect (10,10,100,90), "Loader Menu");

    // Make the first button. If it is pressed, Application.Loadlevel (1) will be executed
    if (GUI.Button (Rect (20,40,80,32), "Level 1")) {
        Debug.Log("levle1");
    }

    // Make the second button.
    if (GUI.Button (Rect (20,70,80,32), "Level 2")) {
        Debug.Log("levle2");
        
    }

}




function Update () {
//Debug.Log(flag);
}



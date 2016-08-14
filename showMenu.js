#pragma strict
import UnityEngine.SceneManagement;


private var flag;
var windowRect : Rect = Rect (20, 20, 520, 550);

var P1:GameObject;

var pos;

function Start () {
flag=false;
Debug.Log(Screen.width);
Debug.Log(Screen.height);
Debug.Log(SceneManager.sceneCount);//场景数量0表示1个场景，The total number of scenes.
Debug.Log(SceneManager.GetSceneByName("2"));
SceneManager.UnloadScene("2");//
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
		SceneManager.LoadScene("2");

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


 //可移动的 Register the window.
		windowRect = GUI.Window (0, windowRect, DoMyWindow,"3");

}




function Update () {
//Debug.Log(flag);
Debug.Log(pos);
pos= P1.GetComponent.<Transform>().position;
}



// 可移动的Make the contents of the window
	function DoMyWindow (windowID : int) {
		GUI.Button (Rect (10,20,100,20), "me"+pos);
		// Insert a huge dragging area at the end.
		// This gets clipped to the window (like all other controls) so you can never
		//  drag the window from outside it.
		GUI.DragWindow ();
	}

 
/*===============================================================================
 
===============================================================================*/
using UnityEngine;
using System.Collections;
using System.Xml;
using System.IO;

public class IndexScreen : MonoBehaviour
{
	



	private ArrayList Adialogue=new ArrayList();
	private ArrayList Bdialogue=new ArrayList();

	void Awake(){

		LoadXml ();


	}

	public void LoadXml(){
		//创建xml文档
		XmlDocument xml = new XmlDocument();
		XmlReaderSettings set = new XmlReaderSettings();
		set.IgnoreComments = true;//这个设置是忽略xml注释文档的影响。有时候注释会影响到xml的读取
		xml.Load(XmlReader.Create((Application.dataPath+"/Data/GameObjectData.xml"),set));
		//得到objects节点下的所有子节点
		XmlNodeList xmlNodeList = xml.SelectSingleNode("objects").ChildNodes;
		//遍历所有子节点
		foreach(XmlElement xl1 in xmlNodeList)
		{

			if(xl1.GetAttribute("id")=="show")
			{
				//继续遍历id为show的节点下的子节点
				foreach(XmlElement xl2 in xl1.ChildNodes)
				{
					//
					Debug.Log(xl2.GetAttribute("name") + ": " + xl2.InnerText);
					var rotation = Quaternion.identity;
					GameObject instance = Instantiate(Resources.Load("Prefabs/"+xl2.GetAttribute("name"), typeof(GameObject)),Vector3.up*100,rotation ) as GameObject;


				}
			}
		}
		print(xml.OuterXml);

	}



    #region PUBLIC_METHODS
    public void OnStartAR()
    {
        Debug.Log("Starttt");
#if (UNITY_5_2 || UNITY_5_1 || UNITY_5_0)
        Application.LoadLevel("Vuforia-2-Loading");
#else // UNITY_5_3 or above
        UnityEngine.SceneManagement.SceneManager.LoadScene("Vuforia-2-Loading");
#endif
    }
    #endregion // PUBLIC_METHODS


    #region MONOBEHAVIOUR_METHODS
    void Update()
    {
        if (Input.GetKeyUp(KeyCode.Return))
        {
            // Treat 'Return' key as pressing the Close button and dismiss the About Screen
            OnStartAR();
        }
        else if (Input.GetKeyUp(KeyCode.JoystickButton0))
        {
            // Similar to above except detecting the first Joystick button
            // Allows external controllers to dismiss the About Screen
            // On an ODG R7 this is the select button
            OnStartAR();
        }
        else if (Input.GetKeyUp(KeyCode.Escape))
        {
#if UNITY_EDITOR
            UnityEditor.EditorApplication.isPlaying = false;
#elif UNITY_ANDROID
            // On Android, the Back button is mapped to the Esc key
            Application.Quit();
#endif
        }
    }
    #endregion // MONOBEHAVIOUR_METHODS
}

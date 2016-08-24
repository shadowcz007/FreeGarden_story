using UnityEngine;
using System.Collections;
using System.Xml;
using System.IO;
using UnityEngine.UI;

public class Index : MonoBehaviour {

	public GameObject MainUI;
	private int islandNums=0;

	void Awake(){

		LoadXml ();


	}
	// Use this for initialization
	void Start () {
		MainUI.transform.FindChild("Nums").GetComponent<Text>().text=islandNums.ToString();
	}
	
	// Update is called once per frame
	void Update () {
	
	}





	public void LoadXml(){
		string path = Application.dataPath + "/Data/GameObjectData.xml";
		if(File.Exists(path)){
			XmlDocument xml = new XmlDocument();
			xml.Load(path);
			XmlNodeList xmlNodeList = xml.SelectSingleNode("objects").ChildNodes;
			foreach(XmlElement xl1 in xmlNodeList){

				if(xl1.GetAttribute("id")=="show")
				{
					//继续遍历id为show的节点下的子节点
					foreach(XmlElement xl2 in xl1.ChildNodes)
					{
						//
						Debug.Log(xl2.GetAttribute("display") + ": " + xl2.InnerText);
						if (xl2.GetAttribute ("display") == "show") {
							islandNums += 1;
							GameObject instance = Instantiate (Resources.Load ("Prefabs/" + xl2.GetAttribute ("name"), typeof(GameObject))) as GameObject;
						}

					}
				}
			}

			print(xml.OuterXml);
		}


	}


	public void DefaultLoadXml(){
		string path = Application.dataPath + "/Data/GameObjectData.xml";
		if(File.Exists(path)){
			XmlDocument xml = new XmlDocument();
			xml.Load(path);
			XmlNodeList xmlNodeList = xml.SelectSingleNode("objects").ChildNodes;
			foreach(XmlElement xl1 in xmlNodeList){

				if(xl1.GetAttribute("id")=="show"){
					//继续遍历id为show的节点下的子节点
					foreach(XmlElement xl2 in xl1.ChildNodes){											
						xl2.SetAttribute ("display","hide");
					}
				}
			}
			xml.Save(path);
			print(xml.OuterXml);
		}

		UnityEngine.SceneManagement.SceneManager.LoadScene("Vuforia-1-Index");

	}

}

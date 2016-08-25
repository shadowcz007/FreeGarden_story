using UnityEngine;
using System.Collections;
using System.Xml;
using System.IO;
using Vuforia;
using UnityEngine.UI;

public class TapARController : MonoBehaviour {


	[Tooltip("The prefab that gets spawned upon clicking")]
	public GameObject Prefab;

	[Tooltip("The amount of seconds it takes for the prefab to get automatically destroyed after being spawned")]
	public float AutoDestroyDelay = 2.0f;

	public GameObject InfoUI; 
	public GameObject Child;
	public GameObject AlertUI;
	public GameObject TitleUI;
	public GameObject MainUI;
	private string Childzh="";
	private string Childcontent="";

	private bool openAlert=true;

	// Use this for initialization
	void Start () {

	
	}
	
	// Update is called once per frame
	void Update () {

	


		if (openAlert) {
			AlertUI.SetActive (true);
			
		
		} else {
			AlertUI.SetActive (false);
		
		
		}


	}



	void OnGUI(){

		/*
		if(Child){
			LoadXml(out Childzh,out Childcontent,Child.name);

			Debug.Log (Childzh);

			// Make a group on the center of the screen
			GUI.BeginGroup (new Rect (10, 20, Screen.width-20, Screen.height/2));
			// All rectangles are now adjusted to the group. (0,0) is the topleft corner of the group.

			// We'll make a box so you can see where the group is on-screen.
			GUI.Box (new Rect (0,0,100,100), Child.name);

			GUI.TextArea(new Rect(2,100, 100, 200), Childcontent, 200);

			if (GUI.Button (new Rect (10,40,80,30), "OK")) {

				UnityEngine.SceneManagement.SceneManager.LoadScene("Vuforia-1-Index");

			}

			// End the group we started above. This is very important to remember!
			GUI.EndGroup ();





		}
		*/
	}

	public void CloseAlertUI(){
		AlertUI.SetActive (false);
		Debug.Log ("click close");
		openAlert = false;
	
	}
	public void AddARcard(){
		updateXML (Child.name + "_island");
		UnityEngine.SceneManagement.SceneManager.LoadScene("Vuforia-1-Index");		
	}
	public void CloseInfoUI(){
		InfoUI.SetActive (false);
		TitleUI.SetActive (false);
		MainUI.SetActive (true);
	}

	protected virtual void OnEnable()
	{
		// Hook into the OnFingerTap event
		Lean.LeanTouch.OnFingerTap += OnFingerTap;
	}

	protected virtual void OnDisable()
	{
		// Unhook into the OnFingerTap event
		Lean.LeanTouch.OnFingerTap -= OnFingerTap;
	}

	public void OnFingerTap(Lean.LeanFinger finger)
	{
		// Does the prefab exist?
		if (Prefab != null){
			// Make sure the finger isn't over any GUI elements
			if (finger.IsOverGui == false && AlertUI.activeInHierarchy==false){
				// Clone the prefab, and place it where the finger was tapped
				var position = finger.GetWorldPosition(50.0f);
				var rotation = Quaternion.identity;
				var clone    = (GameObject)Instantiate(Prefab, position, rotation);

				// Make sure the prefab gets destroyed after some time
				Destroy(clone, AutoDestroyDelay);

				//Assigns the first child of the first child of the Game Object this script is attached to.
				if (this.gameObject.transform.childCount != 0) {

					Child = this.gameObject.transform.GetChild (0).gameObject;



					LoadXml (out Childzh, out Childcontent, Child.name);

					Debug.Log (Childzh);

					CloseAlertUI ();
					GameObject.Find ("MainUI").SetActive (false);
					TitleUI.SetActive (true);
					TitleUI.transform.position=Child.transform.position;
					TitleUI.transform.FindChild ("TitleZh").GetComponent<Text> ().text = Childzh;
					TitleUI.transform.FindChild ("TitleEn").GetComponent<Text> ().text = Child.name;


				} 

				openAlert =false; 

			}
		}
	}

	public void OpenInfoUI(){
		
		InfoUI.transform.FindChild ("content").GetComponent<Text> ().text = Childcontent;

		InfoUI.SetActive (true);
	
	
	
	}

	void updateXML(string name){
		string path = Application.persistentDataPath + "/DefaultData.xml";
		if(File.Exists(path)){
			XmlDocument xml = new XmlDocument();
			xml.Load(path);
			XmlNodeList xmlNodeList = xml.SelectSingleNode("objects").ChildNodes;
			foreach (XmlElement xl1 in xmlNodeList) {
				if (xl1.GetAttribute ("id") == "show") {

					foreach(XmlElement xl2 in xl1.ChildNodes){	
						if(xl2.GetAttribute ("name")==name){
							xl2.SetAttribute ("display","show");
						}

					}		
							/*
							XmlElement elementChild = xml.CreateElement ("contents");
							elementChild.SetAttribute ("name", name);
							elementChild.InnerText = name;
							xl1.AppendChild (elementChild);	
							
							*/

				}
			}

			xml.Save(path);
		}
	}


	public void LoadXml(out string zh,out string content,string name){
		zh = "";
		content="";
		//创建xml文档
		TextAsset m_XmlTextAsset = Resources.Load ("DefaultData") as TextAsset;
		XmlDocument xml = loadXmlnew (m_XmlTextAsset);

		//得到objects节点下的所有子节点
		XmlNodeList xmlNodeList = xml.SelectSingleNode("objects").ChildNodes;
		//遍历所有子节点
		foreach(XmlElement xl1 in xmlNodeList)
		{

			if(xl1.GetAttribute("id")=="info")
			{
				//继续遍历id为show的节点下的子节点
				foreach(XmlElement xl2 in xl1.ChildNodes)
				{
					//
					if(xl2.GetAttribute ("name")==name){

						Debug.Log(xl2.GetAttribute("name") + ": " + xl2.InnerText);
						content = xl2.InnerText;
						zh=xl2.GetAttribute("zh");
					}



				}
			}
		}


	}

	public XmlDocument  loadXmlnew(TextAsset xmlFile){
		MemoryStream assetStream = new MemoryStream(xmlFile.bytes);
		XmlReader reader = XmlReader.Create(assetStream);
		XmlDocument xmlDoc = new XmlDocument();
		try
		{
			xmlDoc.Load(reader);
		}
		catch (XmlException ex)
		{
			Debug.Log("读取错误 "+ xmlFile.name + ":\n" + ex);
		}
		finally
		{
			Debug.Log(xmlFile.name + " 已读取");
		}

		return xmlDoc;
	}


}


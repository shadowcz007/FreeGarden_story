using UnityEngine;
using System.Collections;
using System.Xml;
using System.IO;
using UnityEngine.UI;

public class Index : MonoBehaviour {

	public GameObject MainUI;
	private int islandNums=0;




	//RuntimeInitializeOnLoadMethod
	static void Initialize(){
		TextAsset m_XmlTextAsset = Resources.Load ("DefaultData") as TextAsset;
		XmlDocument m_xmlDoc = loadXmlnew (m_XmlTextAsset);

		Debug.Log ("读取成功" + m_xmlDoc);

		string m_XmlTextAssetPath = Application.persistentDataPath.ToString () + "/DefaultData.xml";
		writeXml (m_XmlTextAssetPath, m_xmlDoc);


	}


	void Awake(){

			
			LoadGameObjectData ();		


	}


	void Start () {

		MainUI.transform.FindChild("Nums").GetComponent<Text>().text=islandNums.ToString();
	}
	
	// Update is called once per frame
	void Update () {
	
	}



	public static XmlDocument  loadXmlnew(TextAsset xmlFile){
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

	public static void writeXml(string filepath, XmlDocument xmlDoc){
		if (File.Exists(filepath))
		{
			using (TextWriter sw = new StreamWriter(filepath, false, System.Text.Encoding.UTF8)) //Set encoding
			{
				xmlDoc.Save(sw);
				Debug.Log ("保存");
			}
		}
	}




	public void LoadGameObjectData(){
		string path = Application.persistentDataPath + "/DefaultData.xml";
		Debug.Log (path);
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


	public  void DefaultLoadXml(){
		
		TextAsset m_XmlTextAsset = Resources.Load ("DefaultData") as TextAsset;
		XmlDocument m_xmlDoc = loadXmlnew (m_XmlTextAsset);

		Debug.Log ("读取成功" + m_xmlDoc);

		string m_XmlTextAssetPath = Application.persistentDataPath.ToString () + "/DefaultData.xml";
		writeXml (m_XmlTextAssetPath, m_xmlDoc);

		UnityEngine.SceneManagement.SceneManager.LoadScene("Vuforia-1-Index");
	}


	public void AllOpenXML(){
		string path = Application.persistentDataPath + "/DefaultData.xml";
		if(File.Exists(path)){
			XmlDocument xml = new XmlDocument();
			xml.Load(path);
			XmlNodeList xmlNodeList = xml.SelectSingleNode("objects").ChildNodes;
			foreach (XmlElement xl1 in xmlNodeList) {
				if (xl1.GetAttribute ("id") == "show") {

					foreach(XmlElement xl2 in xl1.ChildNodes){	
						xl2.SetAttribute ("display","show");
					}		

				}
			}
			xml.Save(path);
		}

		UnityEngine.SceneManagement.SceneManager.LoadScene("Vuforia-1-Index");
	}

}

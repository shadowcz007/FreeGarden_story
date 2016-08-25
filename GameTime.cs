using UnityEngine;
using System.Collections;
using UnityEngine.UI;
using System.IO;
using System.Xml;

public class GameTime : MonoBehaviour {
	public GameObject IslandUI;
	public GameObject progress;
	// Use this for initialization
	//之前的一个时间点  
	public long startTime = 15870304;  
	//限定时间秒  
	private long fixedTime = 86000;  //timeStamp DateStringFromNow()转化为时间

	private long nowTime;  

	public float IslandPertimer = 10.0f;

	bool isOver = false;  

	private float IslandPer;

	// Use this for initialization  
	void Start() {  
		
		nowTime = (System.DateTime.Now.Ticks - System.DateTime.Parse("1970-01-01").Ticks) / 10000000;  
		Debug.Log(nowTime.ToString());  
		InvokeRepeating("CountDown", 0, 1);  
	}  


	// Update is called once per frame  
	void Update(){  
		if (!isOver && nowTime - startTime >= fixedTime){  
			Debug.Log("倒计时结束");  
			isOver = true;  
		} 

		IslandPertimer-= Time.deltaTime;

		if ( IslandPertimer <= 0 &&IslandPer<100.0f) {
			IslandPer += 1.0f;
			updateXML (IslandPer.ToString ());
			IslandUI.transform.FindChild ("Percent").GetComponent<Slider> ().value = IslandPer;
			progress.GetComponent <Text> ().text = IslandPer.ToString ()+"%";

			IslandPertimer = 10.0f;
		}


	}  


	void CountDown(){  
		
		gameObject.GetComponent <Text> ().text = ((fixedTime / 60 - fixedTime / (60 * 60 * 24) * 24 * 60) / 60).ToString() + "小时"  
			+ ((fixedTime / 60) % 60).ToString() + "分"  
			+ (fixedTime % 60).ToString() + "秒";
		fixedTime -= 1;  
		/*
		 * fixedTime / (60 * 60 * 24)).ToString() + "天"  
			+ 
		gameObject.GetComponent<Text>().text =DateStringFromNow (fixedTime.ToString ());
		*/

	} 

	void updateXML(string time){
		string path = Application.persistentDataPath + "/DefaultData.xml";
		if(File.Exists(path)){
			XmlDocument xml = new XmlDocument();
			xml.Load(path);
			XmlNodeList xmlNodeList = xml.SelectSingleNode("objects").ChildNodes;
			foreach (XmlElement xl1 in xmlNodeList) {
				if (xl1.GetAttribute ("id") == "show") {

					foreach(XmlElement xl2 in xl1.ChildNodes){	
						if(xl2.GetAttribute ("display")=="show"){
							xl2.SetAttribute ("per",time);
						}

					}		

				}
			}

			xml.Save(path);
		}
	}


	public string DateStringFromNow(string dt) { 
		string timeStamp = dt;      
		System.DateTime dtStart =System. TimeZone.CurrentTimeZone.ToLocalTime(new System.DateTime(1970, 1, 1));     
		long lTime = long.Parse(timeStamp + "0000000");       
		System.TimeSpan toNow = new System.TimeSpan(lTime);       
		System.DateTime dtResult = dtStart.Add(toNow); 
		System.TimeSpan span =System. DateTime.Now - dtResult; 
		if (span.TotalDays > 90) 
		{ 
			return "3个月前"; 

		} 
		else
			if (span.TotalDays > 60) 
			{ 
				return "2个月前"; 

			} 
			else if ( span.TotalDays > 30 ) 
			{ 

				return "1个月前"; 
			} 
			else if (span.TotalDays > 14) 
			{ 
				return 
					"2周前"; 
			} 
			else if (span.TotalDays > 7) 
			{ 
				return "1周前"; 
			} 

			else if (span.TotalDays > 1) 
			{ 
				return string.Format("{0}天前", 
					Mathf.FloorToInt((float)span.TotalDays)); 
			} 
			else if (span.TotalHours > 1) 
			{ 
				return string.Format("{0}小时前",Mathf.FloorToInt((float)span.TotalHours)); 
			} 
			else if (span.TotalMinutes > 1) 
			{ 
				return string.Format("{0}分钟前", Mathf.FloorToInt((float)span.TotalMinutes)); 
			} 
			else if (span.TotalSeconds >= 1) 
			{ 
				return string.Format("{0}秒前", 
					Mathf.FloorToInt((float)span.TotalSeconds)); 
			}

			else { 
				return "1秒前"; 

			} 
	}








}

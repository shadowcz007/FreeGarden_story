using UnityEngine;
using System.Collections;
using UnityEngine.UI;

public class GameTime : MonoBehaviour {
	
	// Use this for initialization
	//之前的一个时间点  
	public long startTime = 1435870304;  
	//限定时间秒  
	private long fixedTime = 200000;  
	private long nowTime;  


	bool isOver = false;  

	public string dt;//timeStamp DateStringFromNow()转化为时间


	// Use this for initialization  
	void Start() {  
		
		nowTime = (System.DateTime.Now.Ticks - System.DateTime.Parse("1970-01-01").Ticks) / 10000000;  
		Debug.Log(nowTime.ToString());  
		InvokeRepeating("CountDown", 0, 1);  
	}  


	// Update is called once per frame  
	void Update(){  
		if (!isOver && nowTime - startTime >= fixedTime)  
		{  
			Debug.Log("倒计时结束");  
			isOver = true;  
		}  
	}  


	void CountDown()  
	{  
		fixedTime -= 1;  
		gameObject.GetComponent<Text>().text = (fixedTime / (60 * 60 * 24)).ToString() + "天"  
			+ ((fixedTime / 60 - fixedTime / (60 * 60 * 24) * 24 * 60) / 60).ToString() + "小时"  
			+ ((fixedTime / 60) % 60).ToString() + "分"  
			+ (fixedTime % 60).ToString() + "秒";  
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

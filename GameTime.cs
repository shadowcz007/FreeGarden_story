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




	// Use this for initialization  
	void Start()  
	{  
		
		nowTime = (System.DateTime.Now.Ticks - System.DateTime.Parse("1970-01-01").Ticks) / 10000000;  
		Debug.Log(nowTime.ToString());  
		InvokeRepeating("CountDown", 0, 1);  
	}  


	// Update is called once per frame  
	void Update()  
	{  
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
}

using UnityEngine;  
using System.Collections;
 
using UnityEngine.UI;
public class GetGPS : MonoBehaviour {  

	public string gps_info = "";  
	public int flash_num = 1;  
	 

	public GameObject gpsinfo;
	void Start(){


	
	}
	void Update(){
		
		gpsinfo.GetComponent<Text> ().text = gps_info;

	
	}

	 

	// Input.location = LocationService  
	// LocationService.lastData = LocationInfo   
	public void RefreshGPS(){
		this.gps_info = "N:" + Input.location.lastData.latitude + " E:"+Input.location.lastData.longitude;  
		this.gps_info = this.gps_info + " Time:" + Input.location.lastData.timestamp;  
		this.flash_num += 1;   
	}
	public void StopGPS () {  
		Input.location.Stop();  
	}  

	public void StartGPS(){	
		StartCoroutine(IEnStartGPS());  
	}

	IEnumerator IEnStartGPS () {  
		// Input.location 用于访问设备的位置属性（手持设备）, 静态的LocationService位置  
		// LocationService.isEnabledByUser 用户设置里的定位服务是否启用  
		if (!Input.location.isEnabledByUser) {  
			this.gps_info = "isEnabledByUser value is:"+Input.location.isEnabledByUser.ToString()+" Please turn on the GPS";   
			return false;  
		}  

		// LocationService.Start() 启动位置服务的更新,最后一个位置坐标会被使用  
		Input.location.Start(10.0f, 10.0f);  

		int maxWait = 20;  
		while (Input.location.status == LocationServiceStatus.Initializing && maxWait > 0) {  
			// 暂停协同程序的执行(1秒)  
			yield return new WaitForSeconds(1);  
			maxWait--;  
		}  

		if (maxWait < 1) {  
			this.gps_info = "Init GPS service time out";  
			return false;  
		}  

		if (Input.location.status == LocationServiceStatus.Failed) {  
			this.gps_info = "Unable to determine device location";  
			return false;  
		}   
		else {  
			this.gps_info = "N:" + Input.location.lastData.latitude + " E:"+Input.location.lastData.longitude;  
			this.gps_info = this.gps_info + " Time:" + Input.location.lastData.timestamp;  
			yield return new WaitForSeconds(100);  
		}  
	}  
	  



}  

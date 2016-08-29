using UnityEngine;  
using System.Collections;
 
using UnityEngine.UI;
public class GetGPS : MonoBehaviour {  

	public float gps_info_lat ;  
	public float gps_info_log ;  
	public string gps_info_time;  

	public int flash_num = 1;  
	 

	public GameObject gpsinfo_lat;
	public GameObject gpsinfo_log;
	public GameObject gpsinfo_time;

	void Start(){
		
	
	}
	void Update(){
		
		gpsinfo_lat.GetComponent<Text> ().text = gps_info_lat.ToString ();

		gpsinfo_log.GetComponent<Text> ().text = gps_info_log.ToString ();
		gpsinfo_time.GetComponent<Text> ().text = gps_info_time ;
	}

	 

	// Input.location = LocationService  
	// LocationService.lastData = LocationInfo   
	public void RefreshGPS(){
		
		this.gps_info_lat =Input.location.lastData.latitude;  
		this.gps_info_log =Input.location.lastData.longitude; 
		this.gps_info_time =Input.location.lastData.timestamp.ToString ();  
		this.flash_num += 1;   
	}
	public void StopGPS () {  
		Input.location.Stop();  
	}  

	public void StartGPS(){	
		StartCoroutine(IEnstart());  
	}

	IEnumerator IEnstart () {  
		// Input.location 用于访问设备的位置属性（手持设备）, 静态的LocationService位置  
		// LocationService.isEnabledByUser 用户设置里的定位服务是否启用  
		if (!Input.location.isEnabledByUser) {  
			this.gps_info_time = "isEnabledByUser value is:"+Input.location.isEnabledByUser.ToString()+" Please turn on the GPS";   
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
			this.gps_info_time = "Init GPS service time out";  
			return false;  
		}  

		if (Input.location.status == LocationServiceStatus.Failed) {  
			this.gps_info_time = "Unable to determine device location";  
			return false;  
		}   
		else {  
			this.gps_info_lat =Input.location.lastData.latitude;  
			this.gps_info_log =Input.location.lastData.longitude;  
			this.gps_info_time =Input.location.lastData.timestamp.ToString ();  
			yield return new WaitForSeconds(100);  
		}  
	}  
	  



}  

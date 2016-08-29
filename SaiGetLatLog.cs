using UnityEngine;    
using System.Collections;
using System;
using UnityEngine.UI;

public class SaiEarth  {    


	public Vector3 longitude;    
	public Vector3 latitude;    

	public SaiEarth(){    

	}    

	public SaiEarth(Vector3 longitude,Vector3 latitude) {    
		this.latitude = latitude;    
		this.longitude = longitude;    
	}    

	public string toString() {    
		return "Lat:"+this.latitude + ",Long:" + this.longitude;    
	}    
} 


public class SaiGetLatLog : MonoBehaviour {    

	public Transform firstPoint; //Unity中左上点    
	public Transform secondPoint;//Unity中右下点    
	public Transform ARObject;

	public SaiEarth firstSai;//地图中对应的左上经纬度点，比如游戏场地的实际经纬度。北纬N31°12′1.22″ 东经E121°34′47.82″
	public SaiEarth secondSai;//地图中对应的右下经纬度点   ，比如游戏场地的实际经纬度 北纬N31°11′56.25″ 东经E121°35′5.98″

	private float z_offset,x_offset,z_w_offset,x_w_offset;    

	private RaycastHit rayHit; 

	public GameObject gpsinfo_lat;
	public GameObject gpsinfo_log;

	private float gps_info_lat;
	private float gps_info_log;

	private SaiEarth ARObjectSai;

	// Use this for initialization    
	void Start () {    
		InitBasicNum ();//初始化参数  

	}    

	// Update is called once per frame    
	void Update () { 
		gps_info_lat=float.Parse(gpsinfo_lat.GetComponent<Text> ().text);
		gps_info_log=float.Parse(gpsinfo_log.GetComponent<Text> ().text);

		ARObjectSai=new SaiEarth ( dfmTod (gps_info_log) , dfmTod(gps_info_lat));
	
		Debug.Log (getWorldPoint(ARObjectSai).x);

		if (Input.GetMouseButton (0) && Physics.Raycast (Camera.main.ScreenPointToRay (Input.mousePosition), out rayHit, Mathf.Infinity)) {    

			print ( getWorldPoint(ARObjectSai).z+","+ dfmTod (gps_info_log)); 

			ARObject.position = new Vector3 (getWorldPoint(ARObjectSai).x,0,getWorldPoint(ARObjectSai).z);

		}    
	}    


	public 	Vector3 dfmTod(float gps){
		
		return	new Vector3 ((int)gps, (int)((gps - (int)gps)*60),((gps - (int)gps)*60 - (int)((gps - (int)gps)*60))*60); 
	
	}

	void InitBasicNum() {    
		
		firstSai = new SaiEarth (dfmTod (121.5799453787f) , dfmTod(31.2003352884f));//中兴通讯经纬度31.2003352884,121.5799453787，谷歌地球
		secondSai = new SaiEarth (dfmTod (121.5849946998f) , dfmTod(31.1988234819f)); //中兴通讯经纬度31.1988234819,121.5849946998

		//firstSai = new SaiEarth (new Vector3 (121f,34f, 47.82f), new Vector3 (31f, 12f, 1.22f)); 
		//secondSai = new SaiEarth (new Vector3(121f,35f,5.98f),new Vector3(31f,11f,56.25f)); 

		z_offset = Mathf.Abs ((firstSai.latitude.x+firstSai.latitude.y/60+firstSai.latitude.z/3600) - (secondSai.latitude.x+secondSai.latitude.y/60+secondSai.latitude.z/3600));//地图中的维度差    
		x_offset = Mathf.Abs ((firstSai.longitude.x+firstSai.longitude.y/60+firstSai.longitude.z/3600)-(secondSai.longitude.x+secondSai.longitude.y/60+secondSai.longitude.z/3600));//地图中的经度差    

		z_w_offset = Mathf.Abs (firstPoint.localPosition.z - secondPoint.localPosition.z);//unity中的维度差    
		x_w_offset = Mathf.Abs (firstPoint.localPosition.x - secondPoint.localPosition.x);//unity中的经度差    


	}    


	Vector3 getWorldPoint(SaiEarth se)//由经纬度得到位置点    
	{    

		float tempX = (float)(se.longitude.x + se.longitude.y / 60 + se.longitude.z / 3600 - (secondSai.longitude.x + secondSai.longitude.y / 60 + secondSai.longitude.z / 3600));    
		float tempZ = (float)(se.latitude.x + se.latitude.y / 60 + se.latitude.z / 3600 - (secondSai.latitude.x + secondSai.latitude.y / 60 + secondSai.latitude.z / 3600));    

		float _tempX = (float)(tempX * x_w_offset / x_offset + secondPoint.localPosition.x);    
		float _tempZ = (float)(tempZ * z_w_offset / z_offset + secondPoint.localPosition.z);    

		return new Vector3((float)_tempX,0f,(float)_tempZ);    


	}    

	SaiEarth getLatLon(Vector3 curPoint)//由位置点得到经纬度    
	{    
		SaiEarth tempEarth = new SaiEarth();    

		float _z_offset = Mathf.Abs (curPoint.z - secondPoint.localPosition.z) * z_offset / z_w_offset;    
		float _x_offset = Mathf.Abs (curPoint.x - secondPoint.localPosition.x) * x_offset / x_w_offset;    

		float resultX = _x_offset + (secondSai.longitude.x + secondSai.longitude.y/60 + secondSai.longitude.z/3600);    
		float resultZ = _z_offset + (secondSai.latitude.x + secondSai.latitude.y/60 + secondSai.latitude.z/3600);    

		tempEarth.longitude = new Vector3 ((int)resultX, (int)((resultX - (int)resultX)*60),((resultX - (int)resultX)*60 - (int)((resultX - (int)resultX)*60))*60);    
		tempEarth.latitude = new Vector3 ((int)resultZ, (int)((resultZ - (int)resultZ)*60),((resultZ - (int)resultZ)*60 - (int)((resultZ - (int)resultZ)*60))*60);    

		return tempEarth;    

	}    
}    



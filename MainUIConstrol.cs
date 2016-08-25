using UnityEngine;
using System.Collections;
using UnityEngine.UI;
using Vuforia;

public class MainUIConstrol : MonoBehaviour
{
	
	private CameraSettings mCamSettings = null;
	private TrackableSettings mTrackableSettings = null;
	private MenuAnimator mMenuAnim = null;

	private ArrayList Adialogue=new ArrayList();
	private ArrayList Bdialogue=new ArrayList();


	public GameObject MenuUI;


	protected virtual void Start()
	{
		mCamSettings = FindObjectOfType<CameraSettings>();
		mTrackableSettings = FindObjectOfType<TrackableSettings>();
		mMenuAnim = FindObjectOfType<MenuAnimator>();

	}




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


	public void OpenMenu(){
		MenuUI.SetActive (true);


	}

	public void CloseMenu(){
		MenuUI.SetActive (false);	

	}



	public void ShowIndexPage()
	{
		#if (UNITY_5_2 || UNITY_5_1 || UNITY_5_0)
		Application.LoadLevel("Vuforia-1-Index");
		#else
		UnityEngine.SceneManagement.SceneManager.LoadScene("Vuforia-1-Index");
		#endif
	}
	public void ShowAboutPage()
	{
		#if (UNITY_5_2 || UNITY_5_1 || UNITY_5_0)
		Application.LoadLevel("Vuforia-4-Tip");
		#else
		UnityEngine.SceneManagement.SceneManager.LoadScene("Vuforia-4-Tip");
		#endif
	}

	public void ShowTipPage()
	{
		#if (UNITY_5_2 || UNITY_5_1 || UNITY_5_0)
		Application.LoadLevel("Vuforia-5-About");
		#else
		UnityEngine.SceneManagement.SceneManager.LoadScene("Vuforia-5-About");
		#endif
	}




	public void ToggleAutofocus()
	{
		Toggle autofocusToggle = FindUISelectableWithText<Toggle>("Autofocus");
		if (autofocusToggle && mCamSettings)
			mCamSettings.SwitchAutofocus(autofocusToggle.isOn);

		CloseMenu();
	}

	public void ToggleTorch()
	{
		Toggle flashToggle = FindUISelectableWithText<Toggle>("Flash");
		if (flashToggle && mCamSettings) 
		{
			mCamSettings.SwitchFlashTorch (flashToggle.isOn);

			// Update UI toggle status (ON/OFF) in case the flash switch failed
			flashToggle.isOn = mCamSettings.IsFlashTorchEnabled();
		}
		CloseMenu();
	}

	public void SelectCamera(bool front)
	{
		if (mCamSettings)
			mCamSettings.SelectCamera(front ? CameraDevice.CameraDirection.CAMERA_FRONT : CameraDevice.CameraDirection.CAMERA_BACK);

		CloseMenu();
	}

	public void ToggleExtendedTracking()
	{
		Toggle extTrackingToggle = FindUISelectableWithText<Toggle>("Extended");
		if (extTrackingToggle && mTrackableSettings)
			mTrackableSettings.SwitchExtendedTracking(extTrackingToggle.isOn);

		CloseMenu();
	}

	public void ActivateDataset(string datasetName)
	{
		if (mTrackableSettings)
			mTrackableSettings.ActivateDataSet(datasetName);

		CloseMenu();
	}

	public void UpdateUI()
	{
		Toggle extTrackingToggle = FindUISelectableWithText<Toggle>("Extended");
		if (extTrackingToggle && mTrackableSettings) 
			extTrackingToggle.isOn = mTrackableSettings.IsExtendedTrackingEnabled();

		Toggle flashToggle = FindUISelectableWithText<Toggle>("Flash");
		if (flashToggle && mCamSettings)
			flashToggle.isOn = mCamSettings.IsFlashTorchEnabled();

		Toggle autofocusToggle = FindUISelectableWithText<Toggle>("Autofocus");
		if (autofocusToggle && mCamSettings) 
			autofocusToggle.isOn = mCamSettings.IsAutofocusEnabled();

		Toggle frontCamToggle = FindUISelectableWithText<Toggle>("Front");
		if (frontCamToggle && mCamSettings)
			frontCamToggle.isOn = mCamSettings.IsFrontCameraActive();

		Toggle rearCamToggle = FindUISelectableWithText<Toggle>("Rear");
		if (rearCamToggle && mCamSettings)
			rearCamToggle.isOn = !mCamSettings.IsFrontCameraActive();

		Toggle stonesAndChipsToggle = FindUISelectableWithText<Toggle>("Stones");
		if (stonesAndChipsToggle && mTrackableSettings)
			stonesAndChipsToggle.isOn = mTrackableSettings.GetActiveDatasetName().Contains("Stones");

		Toggle tarmacToggle = FindUISelectableWithText<Toggle>("Tarmac");
		if (tarmacToggle && mTrackableSettings)
			tarmacToggle.isOn = mTrackableSettings.GetActiveDatasetName().Contains("Tarmac");
	}
	/*
	public void CloseMenu()	{
		if (mMenuAnim)
			mMenuAnim.Hide();
	}
	*/


	public void OnStartAR(){
		Debug.Log("Starttt");
		UnityEngine.SceneManagement.SceneManager.LoadScene("Vuforia-2-Loading");
	}


	#region PROTECTED_METHODS
	protected T FindUISelectableWithText<T>(string text) where T : UnityEngine.UI.Selectable
	{
		T[] uiElements = GetComponentsInChildren<T>();
		foreach (var uielem in uiElements)
		{
			string childText = uielem.GetComponentInChildren<Text>().text;
			if (childText.Contains(text))
				return uielem;
		}
		return null;
	}
	#endregion //PROTECTED_METHODS




	public void share(){
	
	
	
	}
}

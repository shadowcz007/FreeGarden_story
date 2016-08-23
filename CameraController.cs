using UnityEngine;
using System.Collections;




// This script will spam the console with finger info
public class CameraController : MonoBehaviour
{	public GameObject IslandUI;
	public Camera camera;

	[Tooltip("The minimum field of view angle we want to zoom to")]
	public float Minimum = 20.0f;

	[Tooltip("The maximum field of view angle we want to zoom to")]
	public float Maximum = 300.0f;


	public float Distance = 10.0f;
	[Tooltip("The minimum X position")]
	public float MinX = -200.0f;

	[Tooltip("The maximum X position")]
	public float MaxX = 200.0f;

	[Tooltip("The minimum Y position")]
	public float MinY = -150.0f;

	[Tooltip("The maximum Y position")]
	public float MaxY = 500.0f;

	[Tooltip("The minimum Z position")]
	public float MinZ = -500.0f;

	[Tooltip("The maximum Z position")]
	public float MaxZ = 0.0f;

	[Tooltip("This stores the layers we want the raycast to hit (make sure this GameObject's layer is included!)")]
	public LayerMask LayerMask = UnityEngine.Physics.DefaultRaycastLayers;

	[Tooltip("The previously selected GameObject")]

	private GameObject SelectedGameObject;

	public GameObject prefab; 



	public float cameraRotateSpeed=2.0f;

	public Color selectedColor=Color.red;

	private Vector3 objScreenPos;
	public Transform target;
	public float smoothspeed = 0.3F;

	private Vector3 targetPosition ;

	private GameObject clone;

	void Awake(){

	//	camera=Camera.main;

	}

	void Start(){

	

	}

	void Update(){
		Debug.Log ("fieldofview"+camera.fieldOfView);

		if(SelectedGameObject){

			camera.transform.RotateAround(SelectedGameObject.transform.position, Vector3.up, cameraRotateSpeed * Time.deltaTime);


			camera.transform.LookAt(SelectedGameObject.transform);

			objScreenPos=camera.WorldToScreenPoint (SelectedGameObject.transform.position);

			objScreenPos = new Vector2 (Mathf.Ceil(objScreenPos.x)+44, Mathf.Ceil(objScreenPos.y)-44);
			//	Debug.Log ( Mathf.Ceil(objScreenPos.y));
		}



		


	}

	protected virtual void LateUpdate()
	{
		// Make sure the pinch scale is valid
		if (Lean.LeanTouch.PinchScale > 0.0f) {
			// Store the old size in a temp variable
			var orthographicSize = camera.orthographicSize;

			// Scale the size based on the pinch scale
			orthographicSize /= Lean.LeanTouch.PinchScale;

			// Clamp the size to out min/max values
			orthographicSize = Mathf.Clamp(orthographicSize, Minimum, Maximum);

			// Set the new size
			camera.orthographicSize = orthographicSize;
		} 
		// Does the main camera exist?

			// Store the current camera position in a temp variable
		var worldPosition = camera.transform.position;

			// Modify the world position by the delta world position of all fingers
			worldPosition -= Lean.LeanTouch.GetDeltaWorldPosition(10.0f);

			// Clamp on all axes
			worldPosition.x = Mathf.Clamp(worldPosition.x, MinX, MaxX);
			worldPosition.y = Mathf.Clamp(worldPosition.y, MinY, MaxY);
			worldPosition.z = Mathf.Clamp(worldPosition.z, MinZ, MaxZ);

			// Set the new world position
		camera.transform.position = worldPosition;

	}

	void OnGUI(){
		
		 



	}

	// callback to be called after any camera finishes rendering
	public void MyPostRender(Camera cam)
	{
		//Debug.Log("PostRender " + gameObject.name + " from camera " + cam.gameObject.name);
	}



	protected virtual void OnEnable()
	{
		// Hook events
		Lean.LeanTouch.OnFingerTap      += OnFingerTap;
		//Lean.LeanTouch.OnFingerHeldSet  += OnFingerHeld;
		/*
		Lean.LeanTouch.OnFingerDown     += OnFingerDown;
		Lean.LeanTouch.OnFingerSet      += OnFingerSet;
		Lean.LeanTouch.OnFingerUp       += OnFingerUp;
		Lean.LeanTouch.OnFingerDrag     += OnFingerDrag;


		Lean.LeanTouch.OnFingerSwipe    += OnFingerSwipe;
		Lean.LeanTouch.OnFingerHeldDown += OnFingerHeldDown;

Lean.LeanTouch.OnPinch          += OnPinch;

		Lean.LeanTouch.OnFingerHeldUp   += OnFingerHeldUp;
		Lean.LeanTouch.OnMultiTap       += OnMultiTap;
		Lean.LeanTouch.OnDrag           += OnDrag;
		Lean.LeanTouch.OnSoloDrag       += OnSoloDrag;
		Lean.LeanTouch.OnMultiDrag      += OnMultiDrag;

		Lean.LeanTouch.OnTwistDegrees   += OnTwistDegrees;
		Lean.LeanTouch.OnTwistRadians   += OnTwistRadians;
*/

		// register the callback when enabling object
		Camera.onPostRender += MyPostRender;
	}

	protected virtual void OnDisable()
	{
		// Unhook events
		Lean.LeanTouch.OnFingerTap      -= OnFingerTap;
	//	Lean.LeanTouch.OnFingerHeldSet  -= OnFingerHeld;

		/*
		Lean.LeanTouch.OnFingerDown     -= OnFingerDown;
		Lean.LeanTouch.OnFingerSet      -= OnFingerSet;
		Lean.LeanTouch.OnFingerUp       -= OnFingerUp;
		Lean.LeanTouch.OnFingerDrag     -= OnFingerDrag;

		Lean.LeanTouch.OnFingerSwipe    -= OnFingerSwipe;
		Lean.LeanTouch.OnFingerHeldDown -= OnFingerHeldDown;
Lean.LeanTouch.OnPinch          -= OnPinch;
		Lean.LeanTouch.OnFingerHeldUp   -= OnFingerHeldUp;
		Lean.LeanTouch.OnMultiTap       -= OnMultiTap;
		Lean.LeanTouch.OnDrag           -= OnDrag;
		Lean.LeanTouch.OnSoloDrag       -= OnSoloDrag;
		Lean.LeanTouch.OnMultiDrag      -= OnMultiDrag;

		Lean.LeanTouch.OnTwistDegrees   -= OnTwistDegrees;
		Lean.LeanTouch.OnTwistRadians   -= OnTwistRadians;
*/

		// remove the callback when disabling object
		Camera.onPostRender -= MyPostRender;
	}
	/*
	public void OnFingerDown(Lean.LeanFinger finger)
	{
		Debug.Log("Finger " + finger.Index + " began touching the screen");
	}

	public void OnFingerSet(Lean.LeanFinger finger)
	{
		Debug.Log("Finger " + finger.Index + " is still touching the screen");
	}

	public void OnFingerUp(Lean.LeanFinger finger)
	{
		Debug.Log("Finger " + finger.Index + " finished touching the screen");
	}

	public void OnFingerDrag(Lean.LeanFinger finger)
	{
		Debug.Log("Finger " + finger.Index + " moved " + finger.DeltaScreenPosition + " pixels across the screen");
	}

	public void OnFingerTap(Lean.LeanFinger finger)
	{
		Debug.Log("Finger " + finger.Index + " tapped the screen");
	}

	public void OnFingerSwipe(Lean.LeanFinger finger)
	{
		Debug.Log("Finger " + finger.Index + " swiped the screen");
	}

	public void OnFingerHeldDown(Lean.LeanFinger finger)
	{
		Debug.Log("Finger " + finger.Index + "长按 began touching the screen for a long time");
	}
*/
	/*
	public void OnFingerHeld(Lean.LeanFinger finger)
	{



		// Does the prefab exist?
		if (prefab != null)
		{
			// Make sure the finger isn't over any GUI elements
			if (finger.IsOverGui == false)
			{
				// Clone the prefab, and place it where the finger was tapped

				var screenpos = finger.ScreenPosition;
				var vector3screenpos = new Vector3 (screenpos.x, 0, screenpos.y);
				 
				var position = vector3screenpos;
				Debug.Log (position);
				var rotation = Quaternion.identity;

				if (!clone) {
				
					clone = (GameObject)Instantiate(prefab, position, rotation);
					Debug.Log (clone);
					// Make sure the prefab gets destroyed after some time
					//Destroy(clone);
				}

			}
		}


		Debug.Log("Finger " + finger.Index + " is still touching the screen for a long time");
	}

	*/

	/*
	public void OnFingerHeldUp(Lean.LeanFinger finger)
	{
		Debug.Log("Finger " + finger.Index + " stopped touching the screen for a long time");
	}

	public void OnMultiTap(int fingerCount)
	{
		Debug.Log("The screen was just tapped by " + fingerCount + " finger(s)");
	}

	public void OnDrag(Vector2 pixels)
	{
		Debug.Log("One or many fingers moved " + pixels + " across the screen");
	}

	public void OnSoloDrag(Vector2 pixels)
	{
		Debug.Log("One finger moved " + pixels + " across the screen");
	}

	public void OnMultiDrag(Vector2 pixels)
	{
		Debug.Log("Many fingers moved " + pixels + " across the screen");
	}

	public void OnPinch(float scale)
	{
		Debug.Log("Many fingers pinched " + scale + " percent");
	}

	public void OnTwistDegrees(float angle)
	{
		Debug.Log("Many fingers twisted " + angle + " degrees");

	}

	public void OnTwistRadians(float angle)
	{
		Debug.Log("Many fingers twisted " + angle + " radians");

	}
*/

	//
	public void OnFingerTap(Lean.LeanFinger finger)
	{

		// Raycast information
		var ray = finger.GetRay();
		var hit = default(RaycastHit);

		// Was this finger pressed down on a collider?
		if (Physics.Raycast(ray, out hit, float.PositiveInfinity, LayerMask) == true)
		{
			// Remove the color from the currently selected one?
			if (SelectedGameObject != null) {
				OutlineColorGameObject (SelectedGameObject, Color.black);
			}

			SelectedGameObject = hit.collider.gameObject;
			openIslandUI ();

			OutlineColorGameObject(SelectedGameObject,selectedColor);
		}
	}

	public void openIslandUI(){
		IslandUI.SetActive (true);
	
	
	}


	private static void OutlineColorGameObject(GameObject gameObject, Color color)
	{
		// Make sure the GameObject exists
		if (gameObject != null)
		{
			// Get renderer from this GameObject
			var renderer = gameObject.GetComponent<Renderer>();

			// Make sure the Renderer exists
			if (renderer != null)
			{
				// Get material copy from this renderer
				var material = renderer.material;
				material.SetColor("_OutlineColor", color);

				// Make sure the material exists
				/*
				if (material != null)
				{
					// Set new color
					material.color = color;
				}
				*/
			}
		}
	}


}

using UnityEngine;
using System.Collections;




// This script will spam the console with finger info
public class SimpleInfo : MonoBehaviour
{	
	public Camera camera;
	public float Distance = 10.0f;
	[Tooltip("This stores the layers we want the raycast to hit (make sure this GameObject's layer is included!)")]
	public LayerMask LayerMask = UnityEngine.Physics.DefaultRaycastLayers;

	[Tooltip("The previously selected GameObject")]
	public GameObject SelectedGameObject;


	public float cameraRotateSpeed=20.0f;

	void Awake(){

	
	
	}

	void Start(){
		//Static Variables
		Debug.Log (Camera.allCameras.Length);// Returns all enabled cameras in the scene,==allCameraCount
		Debug.Log (Camera.allCamerasCount);
		Debug.Log (Camera.current);//The camera we are currently rendering with, for low-level render control only (Read Only).
		Debug.Log (Camera.main);//The first enabled camera tagged "MainCamera" (Read Only).
		Debug.Log (Camera.onPostRender);//Event that is fired after any camera finishes rendering.
		Debug.Log (Camera.onPreCull);//Event that is fired before any camera starts culling.
		Debug.Log (Camera.onPreRender);//Event that is fired before any camera starts rendering.

		//variables

		Debug.Log (camera.actualRenderingPath);
		Debug.Log (camera.aspect);//The aspect ratio (width divided by height).
		Debug.Log (camera.backgroundColor);
		Debug.Log (camera.cameraToWorldMatrix);
		Debug.Log (camera.cameraType);
		Debug.Log (camera.clearFlags);
		Debug.Log (camera.clearStencilAfterLightingPass);
		Debug.Log (camera.commandBufferCount);
		Debug.Log (camera.cullingMask);
		Debug.Log (camera.cullingMatrix);
		Debug.Log (camera.depth);
		Debug.Log (camera.depthTextureMode);
		Debug.Log (camera.eventMask);
		Debug.Log (camera.farClipPlane);
		Debug.Log ("fieldofview"+camera.fieldOfView);
		Debug.Log (camera.hdr);
		Debug.Log (camera.layerCullDistances);
		Debug.Log (camera.layerCullSpherical);
		Debug.Log (camera.nearClipPlane);
		Debug.Log (camera.nonJitteredProjectionMatrix);
		Debug.Log (camera.opaqueSortMode);
		Debug.Log (camera.orthographic);
		Debug.Log (camera.orthographicSize);
		Debug.Log (camera.pixelHeight);
		Debug.Log (camera.pixelRect);
		Debug.Log (camera.pixelWidth);
		Debug.Log (camera.projectionMatrix);
		Debug.Log (camera.rect);
		Debug.Log (camera.renderingPath);
		Debug.Log (camera.stereoConvergence);
		Debug.Log (camera.stereoEnabled);
		Debug.Log (camera.stereoMirrorMode);
		Debug.Log (camera.stereoSeparation);
		Debug.Log (camera.stereoTargetEye);
		Debug.Log ("targetDisplay"+camera.targetDisplay);
		Debug.Log (camera.targetTexture);
		Debug.Log (camera.transparencySortMode);
		Debug.Log (camera.useOcclusionCulling);
		Debug.Log (camera.velocity);
		Debug.Log (camera.worldToCameraMatrix);


		//Public Functions

		Debug.Log (camera.transform.position);





	}

	void Update(){
		if(SelectedGameObject){
			camera.transform.RotateAround(SelectedGameObject.transform.position, Vector3.up, cameraRotateSpeed * Time.deltaTime);


		}


		// Does the main camera exist?
		if (camera){
			// Get the world delta of all the fingers
			var worldDelta = Lean.LeanTouch.GetDeltaWorldPosition(10.0f);

			// Subtract the delta to the position
			camera.transform.position -= worldDelta;
		}
	
	
	}




	// callback to be called after any camera finishes rendering
	public void MyPostRender(Camera cam)
	{
		//Debug.Log("PostRender " + gameObject.name + " from camera " + cam.gameObject.name);
	}



	protected virtual void OnEnable()
	{
		// Hook events
		Lean.LeanTouch.OnFingerDown     += OnFingerDown;
		Lean.LeanTouch.OnFingerSet      += OnFingerSet;
		Lean.LeanTouch.OnFingerUp       += OnFingerUp;
		Lean.LeanTouch.OnFingerDrag     += OnFingerDrag;
		Lean.LeanTouch.OnFingerTap      += OnFingerTap;
		Lean.LeanTouch.OnFingerSwipe    += OnFingerSwipe;
		Lean.LeanTouch.OnFingerHeldDown += OnFingerHeldDown;
		Lean.LeanTouch.OnFingerHeldSet  += OnFingerHeld;
		Lean.LeanTouch.OnFingerHeldUp   += OnFingerHeldUp;
		Lean.LeanTouch.OnMultiTap       += OnMultiTap;
		Lean.LeanTouch.OnDrag           += OnDrag;
		Lean.LeanTouch.OnSoloDrag       += OnSoloDrag;
		Lean.LeanTouch.OnMultiDrag      += OnMultiDrag;
		Lean.LeanTouch.OnPinch          += OnPinch;
		Lean.LeanTouch.OnTwistDegrees   += OnTwistDegrees;
		Lean.LeanTouch.OnTwistRadians   += OnTwistRadians;

		// register the callback when enabling object
		Camera.onPostRender += MyPostRender;
	}
	
	protected virtual void OnDisable()
	{
		// Unhook events
		Lean.LeanTouch.OnFingerDown     -= OnFingerDown;
		Lean.LeanTouch.OnFingerSet      -= OnFingerSet;
		Lean.LeanTouch.OnFingerUp       -= OnFingerUp;
		Lean.LeanTouch.OnFingerDrag     -= OnFingerDrag;
		Lean.LeanTouch.OnFingerTap      -= OnFingerTap;
		Lean.LeanTouch.OnFingerSwipe    -= OnFingerSwipe;
		Lean.LeanTouch.OnFingerHeldDown -= OnFingerHeldDown;
		Lean.LeanTouch.OnFingerHeldSet  -= OnFingerHeld;
		Lean.LeanTouch.OnFingerHeldUp   -= OnFingerHeldUp;
		Lean.LeanTouch.OnMultiTap       -= OnMultiTap;
		Lean.LeanTouch.OnDrag           -= OnDrag;
		Lean.LeanTouch.OnSoloDrag       -= OnSoloDrag;
		Lean.LeanTouch.OnMultiDrag      -= OnMultiDrag;
		Lean.LeanTouch.OnPinch          -= OnPinch;
		Lean.LeanTouch.OnTwistDegrees   -= OnTwistDegrees;
		Lean.LeanTouch.OnTwistRadians   -= OnTwistRadians;

		// remove the callback when disabling object
		Camera.onPostRender -= MyPostRender;
	}
	
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
	/*
	public void OnFingerTap(Lean.LeanFinger finger)
	{
		Debug.Log("Finger " + finger.Index + " tapped the screen");
	}
	*/
	public void OnFingerSwipe(Lean.LeanFinger finger)
	{
		Debug.Log("Finger " + finger.Index + " swiped the screen");
	}
	
	public void OnFingerHeldDown(Lean.LeanFinger finger)
	{
		Debug.Log("Finger " + finger.Index + " began touching the screen for a long time");
	}
	
	public void OnFingerHeld(Lean.LeanFinger finger)
	{
		Debug.Log("Finger " + finger.Index + " is still touching the screen for a long time");
	}
	
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
				ColorGameObject (SelectedGameObject, Color.white);
			}

			SelectedGameObject = hit.collider.gameObject;


			ColorGameObject(SelectedGameObject, Color.green);
		}
	}

	private static void ColorGameObject(GameObject gameObject, Color color)
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

				// Make sure the material exists
				if (material != null)
				{
					// Set new color
					material.color = color;
				}
			}
		}
	}


}

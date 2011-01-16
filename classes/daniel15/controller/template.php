<?php defined('SYSPATH') or die('No direct script access.');

class Daniel15_Controller_Template extends Kohana_Controller_Template
{
	protected $internal = false;
	
	public function before()
	{
		// Is this an internal request (HMVC)?
		if ($this->request !== Request::instance())
		{
			$this->internal = true;
			$this->template = 'template_internal';
		}
		// Otherwise, AJAX request?
		elseif (Request::$is_ajax)
		{
			$this->template = 'template_ajax_html';
		}
		
		parent::before();
		
		// Set up some common things
		$this->session = Session::instance();
		$this->logged_in = Membership::instance()->logged_in();
		$this->member = Membership::instance()->get_member();
		// Set body ID
		$this->template->body_id = $this->request->controller . '-' . $this->request->action;
		
		// Check if we have a top message...
		// Why is there no flashdata in Kohana 3?? O_O
		if (($message = $this->session->get('message', null)) != null)
		{
			$this->template->message = $message;
			$this->session->delete('message');
		}
	}
	
	public function after()
	{
		$this->template->logged_in = $this->logged_in;
		$this->template->member = $this->member;
		
		parent::after();
	}
}
?>

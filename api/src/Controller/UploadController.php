<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Response;


/**
 * @Route("/api/upload")
 */
class UploadController extends AbstractController
{
    private $upload_article_dir;
    private $upload_user_dir;
    private $upload_dish_dir;

    public function __construct()
    {
        $this->upload_article_dir = $_SERVER["UPLOAD_ARTICLE_DIR"];
        $this->upload_user_dir = $_SERVER["UPLOAD_USER_DIR"];
        $this->upload_dish_dir = $_SERVER["UPLOAD_DISH_DIR"];
    }


    /**
     * @Route("/{type}/{id}", name="upload_photo")
     */
    public function upload($type, $id) {
        switch($type) {
            case "gerecht":
                $target_dir = $this->upload_dish_dir;
            break;
            case "gebruiker":
                $target_dir=$this->upload_user_dir;
            break;
            case "artikel":
                $target_dir=$this->upload_article_dir;
            break;
        }

        $target_file = $target_dir . basename($_FILES["picture"]["name"]);
        $extension = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));

        if ($extension != "jpg" && $extension != "jpeg"
            || $_FILES["picture"]["size"] > 1000000)
        {
            return false;
        }
        
        $new_filename = $target_dir.$type.$id.".jpg";

        if (move_uploaded_file($_FILES["picture"]["tmp_name"], $new_filename)) {
            return (new Response($type.$id.".".$extension));
        }
        return false;
    }
}
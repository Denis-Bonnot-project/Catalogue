    window.onload=function(){
      var url_data='http://localhost:2403/produits/';
      var produits;

      var loadData=function(){
        var xhr=new XMLHttpRequest();
        xhr.open('GET',url_data,true);
        xhr.onreadystatechange=function(){
          if (xhr.readyState==4 && xhr.status==200) {
            produits=eval('('+xhr.responseText+')');
            var tbody=document.querySelector('tbody');
            tbody.innerHTML="";
            for (produit of produits) {
              console.log(produits);

              var tr=document.createElement('tr');
              var td_image=document.createElement('td');
              var td_nom=document.createElement('td');
              var td_description=document.createElement('td');
              var td_tags=document.createElement('td');
              var td_prix=document.createElement('td');
              var td_poids=document.createElement('td');
              var td_fiche=document.createElement('td');
              var td_action=document.createElement('td');

              td_image.innerHTML="<img src="+produit.image+" style='display: block;' width='155' width='155' >";
              td_nom.innerHTML=produit.nom;
              td_description.innerHTML=produit.description;
              td_tags.innerHTML=produit.tags;
              td_prix.innerHTML=produit.prix+" euros";
              td_poids.innerHTML=produit.poids+" kg";
              td_fiche.innerHTML="<a href='/modifier.html?id="+produit_id+produit.fiche+"'>En savoir plus</a>";

              var produit_id=produit.id;
              var a_modifier="<a href='/modifier.html?id="+produit_id+"'>Modifier</a>";
              var a_effacer="<a href='' data-produit-id=" + produit.id +" class='btn_effacer'>Effacer</a>";
              td_action.innerHTML=a_modifier+ ' | ' +a_effacer;

              tr.appendChild(td_image);
              tr.appendChild(td_nom);
              tr.appendChild(td_description);
              tr.appendChild(td_tags);
              tr.appendChild(td_prix);
              tr.appendChild(td_poids);
              tr.appendChild(td_fiche);
              tr.appendChild(td_action);

              tbody.appendChild(tr);
            }
          }
        }
        xhr.send();
      }

      loadData();

      document.querySelector('body').addEventListener('click',function(e){
        if (e.target.className=="btn_effacer") {
          console.log(e.target.dataset.produitId);
          var produit_id=e.target.dataset.produitId;
          var xhr=new XMLHttpRequest();
          xhr.open('DELETE',url_data+produit_id,true);
          xhr.onreadystatechange=function(){
            if (xhr.readyState==4 && xhr.status==200) {
              loadData();
            }
          }
          xhr.send();
          e.preventDefault();
        }
      }
      )

    }

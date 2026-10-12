import json
import os

with open('src/data/nomenclature.json', 'r', encoding='utf-8') as f:
    nomenclature = json.load(f)

COUNTRY_FLAGS = {
  'benin': '🇧🇯',
  'senegal': '🇸🇳',
  'cote-d-ivoire': '🇨🇮',
  'ghana': '🇬🇭',
  'nigeria': '🇳🇬',
  'rdc': '🇨🇩',
  'ethiopie': '🇪🇹',
  'afrique-du-sud': '🇿🇦',
  'haiti': '🇭🇹',
  'bresil': '🇧🇷',
  'cuba': '🇨🇺',
  'etats-unis': '🇺🇸',
  'france': '🇫🇷',
  'perou': '🇵🇪',
  'japon': '🇯🇵',
  'inde': '🇮🇳'
}

TERRITORY_PHOTOS = {
  'benin': 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=800&q=80',
  'senegal': 'https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=800&q=80',
  'cote-d-ivoire': 'https://images.unsplash.com/photo-1523821741446-edb2b68bb7a0?auto=format&fit=crop&w=800&q=80',
  'ghana': 'https://images.unsplash.com/photo-1575881875475-31024b476d38?auto=format&fit=crop&w=800&q=80',
  'nigeria': 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=800&q=80',
  'rdc': 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
  'ethiopie': 'https://images.unsplash.com/photo-1528728329032-2972f65dfb3f?auto=format&fit=crop&w=800&q=80',
  'afrique-du-sud': 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=800&q=80',
  'haiti': 'https://images.unsplash.com/photo-1584646098378-0874589d76b1?auto=format&fit=crop&w=800&q=80',
  'bresil': 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&w=800&q=80',
  'cuba': 'https://images.unsplash.com/photo-1500759285222-a95626b934cb?auto=format&fit=crop&w=800&q=80',
  'etats-unis': 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=800&q=80',
  'france': 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80',
  'perou': 'https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=800&q=80',
  'japon': 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80',
  'inde': 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=800&q=80'
}

PERSONALITY_PHOTOS = {
  'mandela': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
  'sankara': 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80',
  'sagbohan': 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80',
  'kidjo': 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
  'hampate-ba': 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=800&q=80',
  'fela-kuti': 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80',
  'makeba': 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80',
  'maathai': 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=800&q=80',
  'marley': 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&w=800&q=80',
  'ali': 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=800&q=80',
  'jackson': 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80',
  'cesaire': 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=800&q=80',
  'glissant': 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=800&q=80',
  'garvey': 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=800&q=80',
  'tubman': 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80',
  'angelou': 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80'
}

SAGESSE_PHOTOS = {
  'ego': 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&w=800&q=80',
  'courage': 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
  'lacher-prise': 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
  'recommencer': 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=800&q=80',
  'pardon': 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=800&q=80',
  'amour': 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=800&q=80',
  'fraternite': 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80',
  'transmission': 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80',
  'foi': 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80',
  'silence': 'https://images.unsplash.com/photo-1470240731273-7821a6eeb6bd?auto=format&fit=crop&w=800&q=80',
  'gratitude': 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&w=800&q=80',
  'joie': 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80',
  'resilience': 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
  'deuil': 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=800&q=80',
  'dignite': 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80',
  'vocation': 'https://images.unsplash.com/photo-1519834785169-98be25ec3f84?auto=format&fit=crop&w=800&q=80'
}

EXPERTISE_PHOTOS = {
  'bois': 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
  'tissage': 'https://images.unsplash.com/photo-1528458909336-e7a0adfed0a5?auto=format&fit=crop&w=800&q=80',
  'terre': 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=800&q=80',
  'metal': 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80',
  'cuir': 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80',
  'agroecologie': 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80',
  'cuisine': 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
  'apiculture': 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=800&q=80',
  'peche': 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80',
  'herboristerie': 'https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?auto=format&fit=crop&w=800&q=80',
  'soins': 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
  'musique': 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80',
  'construction': 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80',
  'parole': 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=800&q=80',
  'image': 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=800&q=80',
  'pedagogie': 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80'
}

PRODUIT_PHOTOS = {
  'mode': 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80',
  'bijoux': 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80',
  'maison': 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80',
  'artisanat': 'https://images.unsplash.com/photo-1528458909336-e7a0adfed0a5?auto=format&fit=crop&w=800&q=80',
  'art': 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80',
  'beaute': 'https://images.unsplash.com/photo-1608248597359-33513476d05f?auto=format&fit=crop&w=800&q=80',
  'soins-du-corps': 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
  'plantes': 'https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?auto=format&fit=crop&w=800&q=80',
  'bien-etre': 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80',
  'epicerie': 'https://images.unsplash.com/photo-1509358271058-acd22cc93898?auto=format&fit=crop&w=800&q=80',
  'terroir': 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80',
  'cuisine': 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
  'voyage': 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80',
  'formation': 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80',
  'ecologie': 'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=800&q=80',
  'medias': 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80'
}

MARQUE_PHOTOS = {
  'beaute': 'https://images.unsplash.com/photo-1608248597359-33513476d05f?auto=format&fit=crop&w=800&q=80',
  'mode': 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80',
  'technologie': 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
  'telecoms': 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80',
  'banque': 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=800&q=80',
  'gastronomie': 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
  'boissons': 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
  'voyage': 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=80',
  'hotellerie': 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
  'transport': 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80',
  'sante': 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=800&q=80',
  'maison': 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80',
  'energie': 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=800&q=80',
  'medias': 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80',
  'education': 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80',
  'sport': 'https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=800&q=80'
}

PROJET_PHOTOS = {
  'ecologie': 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80',
  'enfance': 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80',
  'education': 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80',
  'sante': 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=800&q=80',
  'agriculture': 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80',
  'eau': 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80',
  'energie': 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=800&q=80',
  'habitat': 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80',
  'femmes': 'https://images.unsplash.com/photo-1607344645866-009c320c5ab8?auto=format&fit=crop&w=800&q=80',
  'jeunesse': 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80',
  'culture': 'https://images.unsplash.com/photo-1460723237483-7a6dc9d0b212?auto=format&fit=crop&w=800&q=80',
  'musique': 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80',
  'patrimoine': 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80',
  'artisanat': 'https://images.unsplash.com/photo-1528458909336-e7a0adfed0a5?auto=format&fit=crop&w=800&q=80',
  'entrepreneuriat': 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=800&q=80',
  'solidarite': 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?auto=format&fit=crop&w=800&q=80'
}

def family_label(fam):
    mapping = {
        'se-vaincre': 'Se vaincre',
        'se-relier': 'Se relier',
        's-elever': 'S’élever',
        'tenir-debout': 'Tenir debout'
    }
    return mapping.get(fam, fam)

doors_by_id = {d['id']: d for d in nomenclature['doors']}

# Generate explorer entries
sagesses_entries = []
for e in doors_by_id['sagesses']['entries']:
    sagesses_entries.append({
        'id': e['id'],
        'category': 'sagesses',
        'title': e['label'],
        'subtitle': f"Famille : {family_label(e['family'])}",
        'question': e['question'],
        'photoUrl': SAGESSE_PHOTOS.get(e['id'], SAGESSE_PHOTOS['foi']),
        'badge': '16 voix face caméra',
        'family': e['family'],
        'doorId': 'sagesses'
    })

territoires_entries = []
for e in doors_by_id['territoires']['entries']:
    grp_label = 'Berceau africain' if e['group'] == 'afrique' else ('Diaspora' if e['group'] == 'diaspora' else 'Résonance universelle')
    territoires_entries.append({
        'id': e['id'],
        'category': 'territoires',
        'title': e['label'],
        'subtitle': grp_label,
        'question': f"Quelle sagesse ou force tellurique de {e['label']} a profondément forgé votre regard sur le monde ?",
        'flag': COUNTRY_FLAGS.get(e['id'], '🌍'),
        'photoUrl': TERRITORY_PHOTOS.get(e['id'], TERRITORY_PHOTOS['benin']),
        'badge': '16 récits de terroir',
        'group': e['group'],
        'doorId': 'territoires'
    })

expertises_entries = []
for e in doors_by_id['expertises']['entries']:
    expertises_entries.append({
        'id': e['id'],
        'category': 'expertises',
        'title': e['label'],
        'subtitle': ' • '.join(e['covers']),
        'question': f"Quel geste d’exception ou secret de métier incarne le cœur de votre expertise dans « {e['label']} » ?",
        'photoUrl': EXPERTISE_PHOTOS.get(e['id'], EXPERTISE_PHOTOS['bois']),
        'badge': '16 praticiens',
        'covers': e['covers'],
        'doorId': 'expertises'
    })

personnalites_entries = []
for e in doors_by_id['personnalites']['entries']:
    personnalites_entries.append({
        'id': e['id'],
        'category': 'personnalites',
        'title': e['label'],
        'subtitle': f"{e['origin']} • {e['angle']}",
        'question': f"En quoi l'héritage de {e['label']} et son combat pour « {e['angle']} » ont-ils transformé votre vie ou votre art ?",
        'photoUrl': PERSONALITY_PHOTOS.get(e['id'], PERSONALITY_PHOTOS['mandela']),
        'badge': f"Figure {'Afrique' if e['group'] == 'afrique' else 'Diaspora'}",
        'origin': e['origin'],
        'group': e['group'],
        'angle': e['angle'],
        'doorId': 'personnalites'
    })

marques_entries = []
for e in doors_by_id['marques']['entries']:
    marques_entries.append({
        'id': e['id'],
        'category': 'marques',
        'title': e['label'],
        'subtitle': 'Secteur sponsor & partenaires d’impact',
        'question': f"Comment votre entreprise du secteur « {e['label']} » soutient-elle le témoignage authentique de ses clients et artisans ?",
        'photoUrl': MARQUE_PHOTOS.get(e['id'], MARQUE_PHOTOS['mode']),
        'badge': '16 secteurs de sponsors',
        'doorId': 'marques'
    })

projets_entries = []
for e in doors_by_id['projets']['entries']:
    projets_entries.append({
        'id': e['id'],
        'category': 'projets',
        'title': e['label'],
        'subtitle': ' • '.join(e['covers']) if e.get('covers') else 'Cause collective & bien commun',
        'question': f"Quel impact direct et transformation concrète votre cause « {e['label']} » apporte-t-elle sur le terrain ?",
        'photoUrl': PROJET_PHOTOS.get(e['id'], PROJET_PHOTOS['ecologie']),
        'badge': '16 causes citoyennes',
        'covers': e.get('covers', []),
        'doorId': 'projets'
    })

produits_entries = []
for e in doors_by_id['produits-services']['entries']:
    produits_entries.append({
        'id': e['id'],
        'category': 'produits-services',
        'title': e['label'],
        'subtitle': ' • '.join(e['covers']),
        'question': f"Quelle capsule vidéo de 60 à 90 secondes révèle l’authenticité et la valeur de votre offre « {e['label']} » ?",
        'photoUrl': PRODUIT_PHOTOS.get(e['id'], PRODUIT_PHOTOS['artisanat']),
        'badge': 'Capsule vidéo 60-90s',
        'covers': e['covers'],
        'doorId': 'produits-services'
    })

series_entries = [
  {
    'id': 'jesus-legba',
    'category': 'series',
    'title': 'Èṣù < > Jésus',
    'subtitle': 'Deux traditions. Une même question de foi.',
    'question': 'Qu’est-ce qui dans votre foi la plus intime vous relie à ce qui vous dépasse et vous rapproche des autres ?',
    'photoUrl': '/assets/posters/jesus-esu.png',
    'badge': '16 pionniers cooptés'
  },
  {
    'id': 'finagnon-qosqorico',
    'category': 'series',
    'title': 'Finagnon < > Qosqorico',
    'subtitle': 'Bénin < > Pérou. Deux territoires. Une même réflexion sur ce qui nous relie à un lieu.',
    'question': 'Quel est ce lien invisible et indestructible qui vous unit charnellement à la terre de vos ancêtres ?',
    'photoUrl': '/assets/posters/finagnon-qosqorico.png',
    'badge': '16 pionniers cooptés'
  },
  {
    'id': 'blacks-one-beyond-eve',
    'category': 'series',
    'title': 'Blacks One < > Beyond Eve',
    'subtitle': 'La mémoire originelle, la sororité et la diaspora.',
    'question': 'Quelle blessure ou fierté héritée de vos mères portez-vous comme un flambeau dans votre existence ?',
    'photoUrl': '/assets/posters/blacks-one-beyond-eve.png',
    'badge': '16 pionniers cooptés'
  },
  {
    'id': 'dixeat-fiat-luxe',
    'category': 'series',
    'title': 'E Vivi < > Fiat Luxe',
    'subtitle': 'Quand la matière brute devient or, goût et lumière.',
    'question': 'À quel instant précis avez-vous compris que transformer la matière brute était un acte de pure alchimie spirituelle ?',
    'photoUrl': '/assets/posters/dixeat-fiat-luxe.png',
    'badge': '16 pionniers cooptés'
  },
  {
    'id': 'investors-builders',
    'category': 'series',
    'title': 'Investors < > Builders',
    'subtitle': 'Le capital visionnaire face aux bâtisseurs de terrain.',
    'question': 'Comment conciliez-vous la souveraineté économique, la rentabilité et l’impact écologique durable ?',
    'photoUrl': '/assets/posters/investors-builders.png',
    'badge': '16 pionniers cooptés'
  },
  {
    'id': 'other-eyes-sixth-sense',
    'category': 'series',
    'title': 'Other Eyes < > Sixth Sense',
    'subtitle': 'La perception intuitive et les mémoires subtiles du vivant.',
    'question': 'Comment développez-vous l’écoute intérieure et la sensibilité aux énergies invisibles ?',
    'photoUrl': '/assets/posters/other-eyes-sixth-sense.png',
    'badge': '16 pionniers cooptés'
  }
]

file_content = f'''import {{ AffiliationPerson, ExplorerCategory }} from '../types';
import {{ NOMENCLATURE }} from './nomenclature';

export type ExplorerCategoryType = ExplorerCategory;

export interface ExplorerCategoryConfig {{
  id: ExplorerCategoryType;
  label: string;
  shortLabel: string;
  tagline: string;
  description: string;
  badge: string;
  iconName: string;
  accentColor: string;
  glowColor: string;
  bgGradient: string;
  coverImage: string;
}}

// =========================================================================
// LES 8 GRANDES PORTES D'ENTRÉE DE L'ASTROLABE EXPLORER (Nomenclature v1.0)
// =========================================================================
export const EXPLORER_CATEGORIES: ExplorerCategoryConfig[] = [
  {{
    id: 'series',
    label: 'Séries',
    shortLabel: 'Séries',
    tagline: 'Filiation & Arbres de Cooptation',
    description: 'Explorez les séries documentaires fondatrices et leurs 16 pionniers. Remontez le fil des transmissions de génération en génération où chacun coapte le suivant.',
    badge: 'Cooptation vivante',
    iconName: 'Film',
    accentColor: '#C89B3C',
    glowColor: 'rgba(200, 155, 60, 0.65)',
    bgGradient: 'from-[#D97706] via-[#92400E] to-[#451A03]',
    coverImage: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=600&q=80'
  }},
  {{
    id: 'sagesses',
    label: 'Sagesses',
    shortLabel: 'Sagesses',
    tagline: '16 thématiques de vie universelles',
    description: '16 thématiques de vie, universelles. Chaque témoin répond à une question existentielle face caméra.',
    badge: '16 sagesses universelles',
    iconName: 'Atom',
    accentColor: '#A855F7',
    glowColor: 'rgba(168, 85, 247, 0.65)',
    bgGradient: 'from-[#A855F7] via-[#7E22CE] to-[#3B0764]',
    coverImage: '/assets/doors/door-memoires.jpg'
  }},
  {{
    id: 'territoires',
    label: 'Territoires',
    shortLabel: 'Territoires',
    tagline: '16 pays pivots : berceaux africains, diaspora, résonances',
    description: 'Explorez 16 pays pivots du monde : témoins, bâtisseurs et créateurs racontent leur mémoire vivante liée à leur terroir.',
    badge: '16 pays pivots',
    iconName: 'Mountain',
    accentColor: '#10B981',
    glowColor: 'rgba(168, 185, 129, 0.65)',
    bgGradient: 'from-[#10B981] via-[#047857] to-[#064E3B]',
    coverImage: '/assets/doors/door-territoires.jpg'
  }},
  {{
    id: 'expertises',
    label: 'Expertises',
    shortLabel: 'Expertises',
    tagline: '16 savoir-faire d’exception & métiers vivants',
    description: 'Des praticiens d’exception, artisans d’art, maîtres et créateurs viennent pitcher leur métier et transmettre en vidéo.',
    badge: '16 savoir-faire',
    iconName: 'GraduationCap',
    accentColor: '#0EA5E9',
    glowColor: 'rgba(14, 165, 233, 0.65)',
    bgGradient: 'from-[#0EA5E9] via-[#0369A1] to-[#082F49]',
    coverImage: '/assets/doors/door-competences.jpg'
  }},
  {{
    id: 'personnalites',
    label: 'Personnalités',
    shortLabel: 'Personnalités',
    tagline: '16 figures noires inspirantes',
    description: '16 figures noires d’Afrique et de la diaspora. Des témoins racontent ce que cette figure a changé dans leur vie ou leur art.',
    badge: '16 figures noires',
    iconName: 'Star',
    accentColor: '#F59E0B',
    glowColor: 'rgba(245, 158, 11, 0.65)',
    bgGradient: 'from-[#F59E0B] via-[#B45309] to-[#78350F]',
    coverImage: '/assets/doors/door-personnalites.jpg'
  }},
  {{
    id: 'produits-services',
    label: 'Produits & Services',
    shortLabel: 'Produits & Services',
    tagline: '16 catégories d’offres concrètes en capsules 60-90s',
    description: '16 catégories pour présenter des offres concrètes en capsules vidéo percutantes de 60 à 90 secondes.',
    badge: '16 catégories d’offres',
    iconName: 'ShoppingBag',
    accentColor: '#6366F1',
    glowColor: 'rgba(99, 102, 241, 0.65)',
    bgGradient: 'from-[#6366F1] via-[#4338CA] to-[#1E1B4B]',
    coverImage: '/assets/doors/door-offres.jpg'
  }},
  {{
    id: 'marques',
    label: 'Marques',
    shortLabel: 'Marques',
    tagline: '16 secteurs de sponsors & partenaires engagés',
    description: '16 secteurs de sponsors potentiels, accueillant les témoignages authentiques et sincères de leurs clients et artisans.',
    badge: '16 secteurs sponsors',
    iconName: 'Gem',
    accentColor: '#FB923C',
    glowColor: 'rgba(251, 146, 60, 0.65)',
    bgGradient: 'from-[#FB923C] via-[#C2410C] to-[#431407]',
    coverImage: '/assets/doors/door-marques.jpg'
  }},
  {{
    id: 'projets',
    label: 'Projets',
    shortLabel: 'Projets',
    tagline: '16 catégories de causes participatives',
    description: '16 catégories de causes dans l’esprit des plateformes de financement participatif et de mobilisation citoyenne.',
    badge: '16 causes citoyennes',
    iconName: 'Sprout',
    accentColor: '#EC4899',
    glowColor: 'rgba(236, 72, 153, 0.65)',
    bgGradient: 'from-[#EC4899] via-[#BE185D] to-[#500724]',
    coverImage: '/assets/doors/door-projets.jpg'
  }}
];

export interface ExplorerCatalogItem {{
  id: string;
  category: ExplorerCategoryType;
  title: string;
  subtitle: string;
  question?: string;
  flag?: string;
  photoUrl: string;
  accentColor?: string;
  badge?: string;
  pioneers?: AffiliationPerson[];
  doorId?: string;
  origin?: string;
  group?: string;
  angle?: string;
  family?: string;
  covers?: string[];
}}

// 1. SÉRIES DOCUMENTAIRES
const seriesList: ExplorerCatalogItem[] = {json.dumps(series_entries, indent=2, ensure_ascii=False)};

// 2. SAGESSES (16 entrées issues de nomenclature.json)
const sagessesList: ExplorerCatalogItem[] = {json.dumps(sagesses_entries, indent=2, ensure_ascii=False)};

// 3. TERRITOIRES (16 entrées issues de nomenclature.json)
const territoiresList: ExplorerCatalogItem[] = {json.dumps(territoires_entries, indent=2, ensure_ascii=False)};

// 4. EXPERTISES (16 entrées issues de nomenclature.json)
const expertisesList: ExplorerCatalogItem[] = {json.dumps(expertises_entries, indent=2, ensure_ascii=False)};

// 5. PERSONNALITÉS (16 entrées issues de nomenclature.json)
const personnalitesList: ExplorerCatalogItem[] = {json.dumps(personnalites_entries, indent=2, ensure_ascii=False)};

// 6. PRODUITS & SERVICES (16 entrées issues de nomenclature.json)
const produitsServicesList: ExplorerCatalogItem[] = {json.dumps(produits_entries, indent=2, ensure_ascii=False)};

// 7. MARQUES (16 entrées issues de nomenclature.json)
const marquesList: ExplorerCatalogItem[] = {json.dumps(marques_entries, indent=2, ensure_ascii=False)};

// 8. PROJETS (16 entrées issues de nomenclature.json)
const projetsList: ExplorerCatalogItem[] = {json.dumps(projets_entries, indent=2, ensure_ascii=False)};

export const EXPLORER_CATALOG: Record<string, ExplorerCatalogItem[]> = {{
  series: seriesList,
  sagesses: sagessesList,
  territoires: territoiresList,
  expertises: expertisesList,
  personnalites: personnalitesList,
  'produits-services': produitsServicesList,
  marques: marquesList,
  projets: projetsList,

  // ALIAS DE RÉTROCOMPATIBILITÉ (Permet de ne rien casser dans les composants existants)
  questions: sagessesList,
  countries: territoiresList,
  thematics: expertisesList,
  personalities: personnalitesList,
  offers: produitsServicesList,
  brands: marquesList,
  projects: projetsList
}};

// =========================================================================
// BANQUE DE VIDÉOS ET PHOTOS DE QUALITÉ ÉDITORIALE
// =========================================================================
const STOCK_VIDEOS = [
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4'
];

const PEOPLE_PHOTOS = [
  'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1528740561666-dc2479dc08ab?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1548142813-c348350df52b?auto=format&fit=crop&w=600&q=80'
];

const FIRST_NAMES = [
  'Arouna', 'Clémence', 'Fousseni', 'Nadia', 'Mathieu', 'Sika', 'Carlos', 'Yannick',
  'Mariama', 'Gilles', 'Sayri', 'Amara', 'Koffi', 'Hélène', 'Malik', 'Éléonore',
  'Dah', 'Tobi', 'Fatou', 'Kenji', 'Camille', 'Inès', 'Kwame', 'Mateo',
  'Aïssata', 'Hiroshi', 'Leïla', 'Bastien', 'Chloé', 'Samba', 'Solène', 'Ramiro'
];

const LAST_NAMES = [
  'Kponton', 'Duval', 'Traoré', 'Benali', 'Roy', 'Dossou', 'Mendoza', 'Noah',
  'Sylla', 'Delorme', 'Quispe', 'Tisserande', 'Houndegla', 'Saint-Amand', 'Diop', 'Vance',
  'Zounon', 'Gomez', 'Diallo', 'Tanaka', 'Ronsard', 'Kone', 'Mensah', 'Silva',
  'Bâ', 'Sato', 'Mansour', 'Fournier', 'Gagnon', 'Camara', 'Lambert', 'Chavez'
];

export const BENIN_STORIES: AffiliationPerson[] = [
  {{
    id: 'bj-01',
    name: 'Dah Zounon',
    firstName: 'Dah',
    age: 68,
    role: 'Gardien de la forêt sacrée de Kpassè',
    territory: 'Ouidah',
    country: 'Bénin',
    flag: '🇧🇯',
    universeTag: 'Tradition & Forêt',
    photoUrl: PEOPLE_PHOTOS[0],
    badge: 'Doyen',
    invitationStory: 'Transmet les pactes de respect des arbres millénaires aux jeunes générations.',
    teaserVideoUrl: STOCK_VIDEOS[0],
    teaserPitch: '« Le Bénin ne s’explique pas avec des mots de touristes : c’est une terre où la forêt entend ce que tu penses avant que tu n’aies ouvert la bouche. »',
    generation: 1
  }},
  {{
    id: 'bj-02',
    name: 'Sika Dossou',
    firstName: 'Sika',
    age: 34,
    role: 'Tisserande de tentures royales appliquées',
    territory: 'Abomey',
    country: 'Bénin',
    flag: '🇧🇯',
    universeTag: 'Tissage Royal',
    photoUrl: PEOPLE_PHOTOS[1],
    badge: 'Artisane d’Art',
    invitationStory: 'Héritière de la 5e génération des tisserands du palais de Béhanzin.',
    teaserVideoUrl: STOCK_VIDEOS[1],
    teaserPitch: '« Chaque motif cousu sur nos toiles est un décret royal : le poisson qui échappe à la nasse, c’est le peuple béninois qui ne plie jamais. »',
    generation: 1
  }},
  {{
    id: 'bj-03',
    name: 'Tobi Houndegla',
    firstName: 'Tobi',
    age: 41,
    role: 'Piroguier & guide de la cité lacustre',
    territory: 'Ganvié',
    country: 'Bénin',
    flag: '🇧🇯',
    universeTag: 'Vie sur l’Eau',
    photoUrl: PEOPLE_PHOTOS[2],
    badge: 'Habitant lacustre',
    invitationStory: 'Navigue chaque jour sur le lac Nokoué sans jamais toucher la terre ferme.',
    teaserVideoUrl: STOCK_VIDEOS[2],
    teaserPitch: '« À Ganvié, nos enfants apprennent à nager avant de courir. L’eau n’est pas un obstacle, elle est notre maison et notre paix. »',
    generation: 1
  }},
  {{
    id: 'bj-04',
    name: 'Chef Koffi',
    firstName: 'Koffi',
    age: 39,
    role: 'Cuisinier de rue & ambassadeur de l’Aloko',
    territory: 'Cotonou',
    country: 'Bénin',
    flag: '🇧🇯',
    universeTag: 'Saveurs de Rue',
    photoUrl: PEOPLE_PHOTOS[3],
    badge: 'Cuisinier de Terroir',
    invitationStory: 'A transformé le carrefour Sainte-Rita en temple des saveurs pimentées.',
    teaserVideoUrl: STOCK_VIDEOS[3],
    teaserPitch: '« Manger à Cotonou à 23h assis sur un tabouret en bois, c’est comprendre la générosité d’un peuple qui partage le sel même dans la nuit. »',
    generation: 1
  }},
  {{
    id: 'bj-05',
    name: 'Arouna Kponton',
    firstName: 'Arouna',
    age: 29,
    role: 'Percussionniste de rythme Kpanlingan',
    territory: 'Porto-Novo',
    country: 'Bénin',
    flag: '🇧🇯',
    universeTag: 'Tambours Royaux',
    photoUrl: PEOPLE_PHOTOS[4],
    badge: 'Maître tambour',
    invitationStory: 'Fait résonner les gongs jumeaux pour réveiller les ancêtres des cours royales.',
    teaserVideoUrl: STOCK_VIDEOS[4],
    teaserPitch: '« Le rythme de Porto-Novo a des syncopes qu’aucun métronome européen ne peut saisir : c’est le battement direct du cœur humain. »',
    generation: 1
  }},
  {{
    id: 'bj-06',
    name: 'Marie-Antoinette Adjovi',
    firstName: 'Marie-Antoinette',
    age: 52,
    role: 'Mère marchande de tissus wax & indigo',
    territory: 'Marché Dantokpa',
    country: 'Bénin',
    flag: '🇧🇯',
    universeTag: 'Marché Dantokpa',
    photoUrl: PEOPLE_PHOTOS[5],
    badge: 'Nana Benz d’honneur',
    invitationStory: 'Pilier de Dantokpa, le plus grand marché à ciel ouvert de toute l’Afrique de l’Ouest.',
    teaserVideoUrl: STOCK_VIDEOS[5],
    teaserPitch: '« Dantokpa, c’est le poumon économique du pays. Si tu veux savoir si le Bénin va bien, viens compter les pas des femmes le matin. »',
    generation: 1
  }},
  {{
    id: 'bj-07',
    name: 'Armel Hounkpatin',
    firstName: 'Armel',
    age: 33,
    role: 'Architecte en terre stabilisée & paille',
    territory: 'Natitingou',
    country: 'Bénin',
    flag: '🇧🇯',
    universeTag: 'Tata Somba',
    photoUrl: PEOPLE_PHOTOS[6],
    badge: 'Bâtisseur écologique',
    invitationStory: 'Réinvente la forteresse traditionnelle Tata Somba de l’Atakora en habitat bioclimatique.',
    teaserVideoUrl: STOCK_VIDEOS[0],
    teaserPitch: '« Nos ancêtres de l’Atakora construisaient des forteresses en terre qui respiraient. Le ciment nous a fait oublier comment rester au frais sans climatiseur. »',
    generation: 1
  }},
  {{
    id: 'bj-08',
    name: 'Félicité Gnanvi',
    firstName: 'Félicité',
    age: 45,
    role: 'Herboriste & guérisseuse des fièvres',
    territory: 'Allada',
    country: 'Bénin',
    flag: '🇧🇯',
    universeTag: 'Pharmacie Naturelle',
    photoUrl: PEOPLE_PHOTOS[7],
    badge: 'Herboriste des simples',
    invitationStory: 'Connaît le nom secret et l’usage médical de 240 racines des forêts d’Allada.',
    teaserVideoUrl: STOCK_VIDEOS[1],
    teaserPitch: '« Quand la feuille de kinkeliba tremble au lever du soleil, c’est qu’elle est prête à soigner. La terre béninoise guérit ceux qui la respectent. »',
    generation: 1
  }},
  {{
    id: 'bj-09',
    name: 'Romuald Hazoumè',
    firstName: 'Romuald',
    age: 62,
    role: 'Artiste plasticien & sculpteur de bidons',
    territory: 'Porto-Novo',
    country: 'Bénin',
    flag: '🇧🇯',
    universeTag: 'Art Contemporain',
    photoUrl: PEOPLE_PHOTOS[8],
    badge: 'Sculpteur engagé',
    invitationStory: 'Transforme les bidons de carburant frelaté Kpayo en masques rituels contemporains.',
    teaserVideoUrl: STOCK_VIDEOS[2],
    teaserPitch: '« Mes masques en bidon d’essence ne sont pas du recyclage : ils renvoient à l’Occident le miroir de notre survie et de notre liberté. »',
    generation: 1
  }},
  {{
    id: 'bj-10',
    name: 'Inès Agossa',
    firstName: 'Inès',
    age: 26,
    role: 'Slameuse & poétesse engagée',
    territory: 'Cotonou',
    country: 'Bénin',
    flag: '🇧🇯',
    universeTag: 'Parole Poétique',
    photoUrl: PEOPLE_PHOTOS[9],
    badge: 'Jeune voix',
    invitationStory: 'Anime les scènes ouvertes de slam sous les manguiers de l’Espace Mayton.',
    teaserVideoUrl: STOCK_VIDEOS[3],
    teaserPitch: '« Le français est une langue empruntée, mais quand on y met les proverbes fon et le sang béninois, elle devient un brasier incandescent. »',
    generation: 1
  }},
  {{
    id: 'bj-11',
    name: 'Père Matthieu',
    firstName: 'Matthieu',
    age: 58,
    role: 'Prêtre catholique en dialogue interreligieux',
    territory: 'Ouidah',
    country: 'Bénin',
    flag: '🇧🇯',
    universeTag: 'Dialogue Spirituel',
    photoUrl: PEOPLE_PHOTOS[10],
    badge: 'Pont spirituel',
    invitationStory: 'Collabore depuis 25 ans avec les dignitaires vodoun pour la concorde civile.',
    teaserVideoUrl: STOCK_VIDEOS[4],
    teaserPitch: '« À Ouidah, l’église fait face au temple des pythons. Si nous ne nous écoutons pas, c’est le visage même de Dieu que nous déchirons. »',
    generation: 1
  }},
  {{
    id: 'bj-12',
    name: 'Blandine Tossou',
    firstName: 'Blandine',
    age: 38,
    role: 'Agricultrice de manioc bio & productrice de gari',
    territory: 'Djidja',
    country: 'Bénin',
    flag: '🇧🇯',
    universeTag: 'Terre & Gari',
    photoUrl: PEOPLE_PHOTOS[11],
    badge: 'Femme de terre',
    invitationStory: 'Gère une coopérative de 60 femmes transformant le manioc au feu de bois.',
    teaserVideoUrl: STOCK_VIDEOS[5],
    teaserPitch: '« Le gari de Savalou et Djidja a la couleur du soleil couchant. Il nourrit l’ouvrier comme le ministre avec la même honnêteté. »',
    generation: 1
  }},
  {{
    id: 'bj-13',
    name: 'Lucien Dossou-Yovo',
    firstName: 'Lucien',
    age: 48,
    role: 'Bronzier d’art selon la technique de la cire perdue',
    territory: 'Abomey',
    country: 'Bénin',
    flag: '🇧🇯',
    universeTag: 'Bronze Sacré',
    photoUrl: PEOPLE_PHOTOS[12],
    badge: 'Maître fondeur',
    invitationStory: 'Fond les léopards et les statues de rois qui gardaient les palais royaux.',
    teaserVideoUrl: STOCK_VIDEOS[0],
    teaserPitch: '« Quand le métal en fusion coule dans le moule de terre d’argile, c’est l’esprit des fondeurs royaux qui guide ma main pour ne pas trembler. »',
    generation: 1
  }},
  {{
    id: 'bj-14',
    name: 'Chantal Vido',
    firstName: 'Chantal',
    age: 31,
    role: 'Médecin urgentiste & bénévole en dispensaire',
    territory: 'Parakou',
    country: 'Bénin',
    flag: '🇧🇯',
    universeTag: 'Soin du Peuple',
    photoUrl: PEOPLE_PHOTOS[13],
    badge: 'Médecin dévoué',
    invitationStory: 'Parcourt à moto les pistes de terre rouge pour vacciner les enfants des campements.',
    teaserVideoUrl: STOCK_VIDEOS[1],
    teaserPitch: '« Voir une mère béninoise sourire parce que son enfant respire à nouveau après le paludisme, c’est le plus grand salaire qu’un être humain puisse recevoir. »',
    generation: 1
  }},
  {{
    id: 'bj-15',
    name: 'Cosme Agon',
    firstName: 'Cosme',
    age: 55,
    role: 'Pêcheur d’embouchure & chanteur de pirogue',
    territory: 'Grand-Popo',
    country: 'Bénin',
    flag: '🇧🇯',
    universeTag: 'La Mer & le Fleuve',
    photoUrl: PEOPLE_PHOTOS[14],
    badge: 'Pêcheur d’océan',
    invitationStory: 'Tire les grands filets traînants avec 30 hommes sur la plage de Grand-Popo.',
    teaserVideoUrl: STOCK_VIDEOS[2],
    teaserPitch: '« L’Atlantique est sauvage ici, mais quand les 30 gars chantent ensemble pour tirer le filet, la vague finit toujours par s’incliner. »',
    generation: 1
  }},
  {{
    id: 'bj-16',
    name: 'Nathalie Zinsou',
    firstName: 'Nathalie',
    age: 44,
    role: 'Médiatrice culturelle pour les enfants des écoles',
    territory: 'Ouidah',
    country: 'Bénin',
    flag: '🇧🇯',
    universeTag: 'Éveil des Enfants',
    photoUrl: PEOPLE_PHOTOS[15],
    badge: 'Passeuse d’art',
    invitationStory: 'Fait découvrir les peintures contemporaines à des milliers d’écoliers chaque année.',
    teaserVideoUrl: STOCK_VIDEOS[3],
    teaserPitch: '« Quand un enfant béninois des quartiers pauvres entre dans un musée et dit \\"C’est beau, je peux le faire aussi\\", nous avons gagné pour cent ans. »',
    generation: 1
  }}
];

// =========================================================================
// FONCTION UNIVERSELLE : RÉCUPÉRER 16 HISTOIRES POUR N'IMPORTE QUEL SUJET
// =========================================================================
export function get16StoriesForTopic(topicId: string, shuffleSeed: number = 0): AffiliationPerson[] {{
  if (topicId === 'benin' && shuffleSeed === 0) {{
    return BENIN_STORIES.slice(0, 16);
  }}

  let targetItem: ExplorerCatalogItem | null = null;
  let targetCategory: string = 'expertises';

  for (const cat of Object.keys(EXPLORER_CATALOG)) {{
    const found = EXPLORER_CATALOG[cat].find(i => i.id === topicId);
    if (found) {{
      targetItem = found;
      targetCategory = cat;
      break;
    }}
  }}

  const title = targetItem?.title || topicId.replace(/-/g, ' ');
  const flag = targetItem?.flag || '🌍';

  let topicHash = 0;
  for (let c = 0; c < topicId.length; c++) {{
    topicHash = ((topicHash << 5) - topicHash + topicId.charCodeAt(c)) | 0;
  }}
  const positiveHash = Math.abs(topicHash);

  const combinedSeed = positiveHash + shuffleSeed * 13;
  const seedOffset = (combinedSeed * 7) % FIRST_NAMES.length;
  const photoOffset = (positiveHash * 3 + shuffleSeed * 11) % PEOPLE_PHOTOS.length;
  const lastOffset = (positiveHash * 5 + shuffleSeed * 7 + 2) % LAST_NAMES.length;

  const generatedStories: AffiliationPerson[] = [];

  for (let i = 0; i < 16; i++) {{
    const nameIdx = (seedOffset + i * 3) % FIRST_NAMES.length;
    const lastIdx = (lastOffset + i * 5) % LAST_NAMES.length;
    const firstName = FIRST_NAMES[nameIdx];
    const lastName = LAST_NAMES[lastIdx];
    const age = 22 + ((positiveHash + i * 7 + shuffleSeed * 5) % 48);
    const photo = PEOPLE_PHOTOS[(photoOffset + i * 3) % PEOPLE_PHOTOS.length];
    const video = STOCK_VIDEOS[(positiveHash + i + shuffleSeed) % STOCK_VIDEOS.length];

    const {{ role, story, pitch }} = generateRoleAndPitch(targetCategory, title, i, shuffleSeed + (positiveHash % 17), targetItem);

    const territory = (targetCategory === 'territoires' || targetCategory === 'countries')
      ? getTerritoryForCountryAndSeed(topicId, i + shuffleSeed)
      : getTerritoryForSeed(i + seedOffset + (positiveHash % 11));

    const country = (targetCategory === 'territoires' || targetCategory === 'countries')
      ? title
      : getCountryForSeed(i + seedOffset + (positiveHash % 7));

    const itemFlag = (targetCategory === 'territoires' || targetCategory === 'countries')
      ? flag
      : getFlagForSeed(i + seedOffset + (positiveHash % 7));

    generatedStories.push({{
      id: `story-${{topicId}}-${{shuffleSeed}}-${{i + 1}}`,
      name: `${{firstName}} ${{lastName}}`,
      firstName,
      age,
      role,
      territory,
      country,
      flag: itemFlag,
      universeTag: title,
      photoUrl: photo,
      badge: i === 0 ? 'Témoin d’honneur' : 'Récit vivant',
      invitationStory: story,
      teaserVideoUrl: video,
      teaserPitch: pitch,
      generation: 1
    }});
  }}

  return generatedStories;
}}

function generateRoleAndPitch(
  category: string, 
  title: string, 
  index: number, 
  seed: number,
  targetItem?: ExplorerCatalogItem | null
): {{ role: string; story: string; pitch: string }} {{
  const batchNum = seed + 1;

  if (category === 'personnalites' || category === 'personalities') {{
    const angle = targetItem?.angle || 'le combat pour la dignité';
    const roles = [
      `Témoin direct & héritier de l'esprit de ${{title}}`,
      `Créateur inspiré par ${{title}} et ${{angle}}`,
      `Sociologue des cultures panafricaines & biographe de ${{title}}`,
      `Artiste de scène portant le message de ${{title}}`,
      `Éducateur transmettant la philosophie de ${{title}}`,
      `Militant de terrain pour ${{angle}} dans le sillage de ${{title}}`
    ];
    const quotes = [
      `« Ce que ${{title}} a changé en moi, c'est la certitude que ${{angle}} n'est pas une option, c'est un devoir d'existence. »`,
      `« Raconter l'héritage de ${{title}}, c'est redonner à notre jeunesse le miroir de sa propre souveraineté. »`,
      `« Dans les moments où tout vacille, la mémoire de ${{title}} me rappelle d'où je viens et pourquoi je reste debout. »`
    ];
    return {{
      role: roles[index % roles.length],
      story: `Témoigne de ce que ${{title}} a transformé dans son art et son engagement (vol. ${{batchNum}}).`,
      pitch: quotes[(index + seed) % quotes.length]
    }};
  }}

  if (category === 'sagesses' || category === 'questions') {{
    const question = targetItem?.question || 'Quelle épreuve vous a transformé ?';
    const roles = [
      `Témoin face caméra • Sagesse : ${{title}}`,
      `Passeur d'expérience vécue sur ${{title}}`,
      `Aîné partageant son cheminement sur ${{title}}`,
      `Jeune voix témoignant de sa traversée de ${{title}}`
    ];
    return {{
      role: roles[index % roles.length],
      story: `Répond face caméra à la question : « ${{question}} »`,
      pitch: `« Quand on traverse l'épreuve de ${{title.toLowerCase()}}, on découvre une vérité en soi qu'aucun livre ne peut enseigner. »`
    }};
  }}

  if (category === 'expertises' || category === 'thematics') {{
    const coversStr = targetItem?.covers?.join(', ') || 'savoir-faire d’exception';
    const roles = [
      `Maître artisan & praticien en ${{title}}`,
      `Compagnon transmetteur (${{coversStr}})`,
      `Créateur d'atelier spécialisé en ${{title}}`,
      `Jeune apprenti formé aux exigences de ${{title}}`
    ];
    return {{
      role: roles[index % roles.length],
      story: `Pitch vidéo de son métier et de ses gestes d'excellence en ${{title}} (vol. ${{batchNum}}).`,
      pitch: `« Le geste de notre métier en ${{title.toLowerCase()}} demande patience et rigueur : la matière ne ment jamais. »`
    }};
  }}

  if (category === 'produits-services' || category === 'offers') {{
    const coversStr = targetItem?.covers?.join(', ') || 'créations artisanales';
    const roles = [
      `Créateur d'offre éthique en ${{title}}`,
      `Artisan d'atelier (${{coversStr}})`,
      `Fondateur d'atelier & capsule vidéo 60-90s`,
      `Praticien indépendant du secteur ${{title}}`
    ];
    return {{
      role: roles[index % roles.length],
      story: `Présente en capsule vidéo de 60-90s ses offres et créations en ${{title}}.`,
      pitch: `« Notre offre en ${{title.toLowerCase()}} privilégie la matière noble, le circuit court et le prix juste. »`
    }};
  }}

  if (category === 'marques' || category === 'brands') {{
    const roles = [
      `Partenaire sponsor & artisan engagé du secteur ${{title}}`,
      `Client témoin de la relation de confiance en ${{title}}`,
      `Responsable d'atelier de production éthique en ${{title}}`,
      `Pionnier des circuits responsables dans le domaine ${{title}}`
    ];
    return {{
      role: roles[index % roles.length],
      story: `Témoigne de l'authenticité et de l'éthique de la marque dans le secteur ${{title}}.`,
      pitch: `« Dans le secteur ${{title.toLowerCase()}}, la confiance se gagne par la preuve des actes et la transparence. »`
    }};
  }}

  if (category === 'projets' || category === 'projects') {{
    const coversStr = targetItem?.covers?.join(', ') || 'initiative d’impact';
    const roles = [
      `Bâtisseur de terrain pour la cause ${{title}}`,
      `Coordinateur de projet citoyen (${{coversStr}})`,
      `Porteur d'initiative en financement participatif`,
      `Bénévole engagé au cœur de la cause ${{title}}`
    ];
    return {{
      role: roles[index % roles.length],
      story: `Mobilise pour la cause ${{title}} (${{coversStr}}) et rend compte des victoires tangibles.`,
      pitch: `« Notre cause pour ${{title.toLowerCase()}} prouve par l'exemple qu'une action collective sur le terrain transforme des vies. »`
    }};
  }}

  // Territoires par défaut
  return {{
    role: `Gardien du terroir & témoin de ${{title}}`,
    story: `Partage la mémoire vivante et les savoirs de son terroir (${{title}}).`,
    pitch: `« Notre terroir de ${{title}} porte en lui des trésors de sagesse que nous transmettons de génération en génération. »`
  }};
}}

function getTerritoryForCountryAndSeed(country: string, seed: number): string {{
  const regions: Record<string, string[]> = {{
    'benin': ['Ouidah', 'Porto-Novo', 'Abomey', 'Ganvié', 'Natitingou', 'Grand-Popo'],
    'senegal': ['Dakar', 'Saint-Louis', 'Casamance', 'Touba', 'Gorée', 'Sine Saloum'],
    'cote-d-ivoire': ['Abidjan', 'Grand-Bassam', 'Yamoussoukro', 'Korhogo', 'Man'],
    'ghana': ['Accra', 'Kumasi', 'Cape Coast', 'Tamale'],
    'nigeria': ['Lagos', 'Ibadan', 'Abuja', 'Calabar', 'Benin City'],
    'rdc': ['Kinshasa', 'Lubumbashi', 'Goma', 'Kisangani'],
    'ethiopie': ['Addis-Abeba', 'Lalibela', 'Gondar', 'Harar'],
    'afrique-du-sud': ['Johannesburg', 'Le Cap', 'Durban', 'Soweto'],
    'haiti': ['Port-au-Prince', 'Jacmel', 'Cap-Haïtien'],
    'bresil': ['Salvador de Bahia', 'Rio de Janeiro', 'Recife', 'São Paulo'],
    'cuba': ['La Havane', 'Santiago de Cuba', 'Trinidad'],
    'etats-unis': ['La Nouvelle-Orléans', 'New York', 'Atlanta', 'Chicago'],
    'france': ['Paris', 'Marseille', 'Lyon', 'Bordeaux'],
    'perou': ['Cusco', 'Lima', 'Vallée Sacrée', 'Arequipa'],
    'japon': ['Kyoto', 'Tokyo', 'Nara', 'Okinawa'],
    'inde': ['Varanasi', 'Kerala', 'Jaipur', 'Mumbai']
  }};
  const list = regions[country.toLowerCase()] || ['Capitale', 'Terroir', 'Vallée'];
  return list[seed % list.length];
}}

function getTerritoryForSeed(seed: number): string {{
  const places = ['Ouidah', 'Dakar', 'Abidjan', 'Kumasi', 'Lagos', 'Salvador', 'Cusco', 'Paris', 'Harar'];
  return places[seed % places.length];
}}

function getCountryForSeed(seed: number): string {{
  const countries = ['Bénin', 'Sénégal', 'Côte d’Ivoire', 'Ghana', 'Nigeria', 'Brésil', 'Pérou', 'France', 'Éthiopie'];
  return countries[seed % countries.length];
}}

function getFlagForSeed(seed: number): string {{
  const flags = ['🇧🇯', '🇸🇳', '🇨🇮', '🇬🇭', '🇳🇬', '🇧🇷', '🇵🇪', '🇫🇷', '🇪🇹'];
  return flags[seed % flags.length];
}}
'''

with open('src/data/explorerTopicsData.ts', 'w', encoding='utf-8') as f:
    f.write(file_content)

print('src/data/explorerTopicsData.ts successfully generated!')

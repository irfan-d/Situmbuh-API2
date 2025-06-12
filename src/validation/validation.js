export function validatePredictionPayload(payload) {
    const { child_name, gender, age, body_length, birth_weight, breastfeeding} = payload;
    if (!child_name) return 'Nama anak wajib diisi';
    if (payload.gender === undefined || payload.gender === null ) return 'Gender wajib diisi';
    if (!age ) return 'Umur wajib diisi';
    if (!body_length ) return 'Tinggi badan wajib diisi';
    if (!birth_weight ) return 'Berat lahir wajib diisi';
    if (payload.breastfeeding === undefined || payload.breastfeeding === null ) return 'Status ASI wajib diisi';
    return null;
}